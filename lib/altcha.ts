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

function createSignature({ algorithm, challenge, salt, maxnumber, hmacKey }: {
  algorithm: string;
  challenge: string;
  salt: string;
  maxnumber: number;
  hmacKey: string;
}) {
  // ALTCHA protocol: signature is HMAC of algorithm|challenge|salt|maxnumber
  // Note: expires is NOT included in the signature as it's not sent back by the widget
  const payload = `${algorithm}|${challenge}|${salt}|${maxnumber}`;
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
  // Don't include expires in the signature since the widget doesn't send it back
  const signature = createSignature({ algorithm, challenge, salt, maxnumber: maxNumber, hmacKey });

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
  if (!hmacKey) {
    console.error("[ALTCHA] Missing HMAC key");
    return false;
  }

  const decoded = decodePayload(payload);
  if (!decoded) {
    console.error("[ALTCHA] Failed to decode payload");
    return false;
  }

  const algorithm = String(decoded.algorithm || "").toUpperCase();
  const challenge = String(decoded.challenge || "");
  const salt = String(decoded.salt || "");
  const signature = String(decoded.signature || "");
  const number = Number(decoded.number);
  const maxnumber = Number(decoded.maxnumber || maxNumber);

  if (!algorithm || !challenge || !salt || !signature || !Number.isFinite(number)) {
    console.error("[ALTCHA] Missing required fields");
    return false;
  }
  if (algorithm !== configuredAlgorithm) {
    console.error("[ALTCHA] Algorithm mismatch:", algorithm, "!==", configuredAlgorithm);
    return false;
  }
  if (number < 0 || number > maxnumber) {
    console.error("[ALTCHA] Number out of range:", number, "not in [0,", maxnumber, "]");
    return false;
  }
  if (maxnumber !== maxNumber) {
    console.error("[ALTCHA] Maxnumber mismatch:", maxnumber, "!==", maxNumber);
    return false;
  }

  const expectedChallenge = hashChallenge(algorithm, salt, number);
  if (expectedChallenge !== challenge) {
    console.error("[ALTCHA] Challenge mismatch");
    return false;
  }

  // Verify signature - using same fields that were used to create it
  const expectedSignature = createSignature({ algorithm, challenge, salt, maxnumber, hmacKey });

  const receivedBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");
  if (receivedBuffer.length !== expectedBuffer.length) {
    console.error("[ALTCHA] Signature length mismatch");
    return false;
  }

  const isValid = timingSafeEqual(receivedBuffer, expectedBuffer);
  if (!isValid) {
    console.error("[ALTCHA] Signature verification failed");
    console.error("[ALTCHA] Received signature:", signature);
    console.error("[ALTCHA] Expected signature:", expectedSignature);
    console.error("[ALTCHA] Verification params:", { algorithm, challenge, salt, maxnumber });
  }
  return isValid;
}
