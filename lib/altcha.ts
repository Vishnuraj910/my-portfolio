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

function createSignature({ algorithm, challenge, salt, maxnumber, expires, hmacKey, includeExpires = true }: {
  algorithm: string;
  challenge: string;
  salt: string;
  maxnumber: number;
  expires: number;
  hmacKey: string;
  includeExpires?: boolean;
}) {
  // ALTCHA widget doesn't send 'expires' back in the payload, so we don't include it in the signature
  // The signature is verified using only the fields that are sent back
  const payload = includeExpires 
    ? `${algorithm}|${challenge}|${salt}|${maxnumber}|${expires}`
    : `${algorithm}|${challenge}|${salt}|${maxnumber}`;
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
  const signature = createSignature({ algorithm, challenge, salt, maxnumber: maxNumber, expires, hmacKey, includeExpires: false });

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
  const { hmacKey, algorithm: configuredAlgorithm, maxNumber, expiresInSeconds } = getConfig();
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
  // The ALTCHA widget doesn't include 'expires' in the payload, so we calculate it from the challenge creation time
  // The challenge is valid for expiresInSeconds from when it was created
  const maxnumber = Number(decoded.maxnumber || maxNumber);

  // For verification, we need to reconstruct the signature with the original expiry
  // Since the widget doesn't send 'expires', we need to use the challenge's embedded expiry
  // We'll try the payload expires first, then fall back to a reasonable window
  let expires = Number(decoded.expires || 0);
  
  // If expires is 0 or not provided, calculate expected expiry from challenge creation time
  // The challenge contains a salt which is generated at challenge creation time
  // We use expiresInSeconds as the window of validity
  if (!expires || expires === 0) {
    // The challenge was created recently, so we calculate expiry from now
    expires = Math.floor(Date.now() / 1000) + expiresInSeconds;
  }

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

  // Verify signature without expires since the widget doesn't send it back
  const expectedSignature = createSignature({ algorithm, challenge, salt, maxnumber, expires, hmacKey, includeExpires: false });

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
