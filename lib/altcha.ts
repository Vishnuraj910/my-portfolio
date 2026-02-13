import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const DEFAULT_ALGORITHM = "SHA-256";
const DEFAULT_MAX_NUMBER = 1_000_000;
const DEFAULT_SALT_LENGTH = 16;
const DEFAULT_EXPIRES_IN_SECONDS = 300;

type SupportedAlgorithm = "SHA-256" | "SHA-384" | "SHA-512";

function getAlgorithm(): SupportedAlgorithm {
  const value = (process.env.ALTCHA_ALGORITHM || DEFAULT_ALGORITHM).toUpperCase();
  if (value === "SHA-256" || value === "SHA-384" || value === "SHA-512") {
    return value;
  }
  return DEFAULT_ALGORITHM;
}

function cryptoAlgorithm(input: string) {
  return input.toLowerCase().replace("-", "");
}

function getConfig() {
  return {
    hmacKey: process.env.ALTCHA_HMAC_KEY || "",
    algorithm: getAlgorithm(),
    maxNumber: Number(process.env.ALTCHA_MAX_NUMBER || DEFAULT_MAX_NUMBER),
    saltLength: Number(process.env.ALTCHA_SALT_LENGTH || DEFAULT_SALT_LENGTH),
    expiresInSeconds: Number(process.env.ALTCHA_EXPIRES_IN_SECONDS || DEFAULT_EXPIRES_IN_SECONDS)
  };
}

function hashChallenge(algorithm: string, salt: string, number: number) {
  return createHash(cryptoAlgorithm(algorithm)).update(`${salt}${number}`).digest("hex");
}

function createSignature({ algorithm, challenge, salt, maxnumber, expires, hmacKey }: {
  algorithm: string;
  challenge: string;
  salt: string;
  maxnumber: number;
  expires: number;
  hmacKey: string;
}) {
  const payload = `${algorithm}|${challenge}|${salt}|${maxnumber}|${expires}`;
  return createHmac(cryptoAlgorithm(algorithm), hmacKey).update(payload).digest("hex");
}

export function createAltchaChallenge() {
  const { hmacKey, algorithm, maxNumber, saltLength, expiresInSeconds } = getConfig();
  if (!hmacKey) {
    throw new Error("Missing ALTCHA_HMAC_KEY");
  }

  const salt = randomBytes(Math.max(8, Math.ceil(saltLength / 2))).toString("hex").slice(0, Math.max(8, saltLength));
  const number = Math.floor(Math.random() * (maxNumber + 1));
  const challenge = hashChallenge(algorithm, salt, number);
  const expires = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const signature = createSignature({ algorithm, challenge, salt, maxnumber: maxNumber, expires, hmacKey });

  return {
    algorithm,
    challenge,
    salt,
    signature,
    maxnumber: maxNumber,
    expires
  };
}

function decodePayload(payload: string) {
  try {
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    return JSON.parse(Buffer.from(padded, "base64").toString("utf-8")) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function verifyAltchaPayload(payload: string): boolean {
  const { hmacKey, algorithm: configuredAlgorithm, maxNumber } = getConfig();
  if (!hmacKey) return false;

  const decoded = decodePayload(payload);
  if (!decoded) return false;

  const algorithm = String(decoded.algorithm || "").toUpperCase();
  const challenge = String(decoded.challenge || "");
  const salt = String(decoded.salt || "");
  const signature = String(decoded.signature || "");
  const number = Number(decoded.number);
  const expires = Number(decoded.expires || 0);
  const maxnumber = Number(decoded.maxnumber || maxNumber);

  if (!algorithm || !challenge || !salt || !signature || !Number.isFinite(number)) return false;
  if (algorithm !== configuredAlgorithm) return false;
  if (!Number.isFinite(expires) || expires < Math.floor(Date.now() / 1000)) return false;
  if (number < 0 || number > maxnumber || maxnumber !== maxNumber) return false;

  const expectedChallenge = hashChallenge(algorithm, salt, number);
  if (expectedChallenge !== challenge) return false;

  const expectedSignature = createSignature({ algorithm, challenge, salt, maxnumber, expires, hmacKey });

  const receivedBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");
  if (receivedBuffer.length !== expectedBuffer.length) return false;

  return timingSafeEqual(receivedBuffer, expectedBuffer);
}
