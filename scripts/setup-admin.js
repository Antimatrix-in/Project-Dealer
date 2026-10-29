#!/usr/bin/env node

/**
 * AntiMatrix Secure Admin Setup & Credential Management Script
 * Reads credentials from environment variables and sets up or updates the administrator account in the persistent database store.
 *
 * Usage:
 *   node scripts/setup-admin.js                     # Initialize/verify administrator account
 *   node scripts/setup-admin.js --reset <new_pass>  # Update/reset administrator password
 */

const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

// 1. Load .env.local if present
const envLocalPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, "utf8");
  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...rest] = trimmed.split("=");
      if (key && rest.length > 0 && !process.env[key.trim()]) {
        process.env[key.trim()] = rest.join("=").trim();
      }
    }
  });
}

const adminEmail = (process.env.ADMIN_EMAIL || "antimatrix2026@gmail.com").trim().toLowerCase();
const defaultPassword =
  process.env.ADMIN_PASSWORD ||
  process.env.EMAIL_PASSWORD;

const storePath = path.join(__dirname, "..", "src", "data", "admin-store.json");

function getStoredAdmins() {
  try {
    if (!fs.existsSync(storePath)) return [];
    return JSON.parse(fs.readFileSync(storePath, "utf8"));
  } catch (err) {
    return [];
  }
}

function saveAdmins(admins) {
  const dir = path.dirname(storePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(storePath, JSON.stringify(admins, null, 2), "utf8");
}

console.log("==========================================");
console.log("AntiMatrix Secure Administrator Setup");
console.log("==========================================");
console.log(`Administrator Email: ${adminEmail}`);

const args = process.argv.slice(2);
const isReset = args[0] === "--reset";
const newPasswordArg = isReset ? args[1] : null;

const passwordToSet = newPasswordArg || defaultPassword;
const admins = getStoredAdmins();
const existingIndex = admins.findIndex((a) => a.email.toLowerCase() === adminEmail);

const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync(passwordToSet, salt);
const now = new Date().toISOString();

if (existingIndex !== -1) {
  if (isReset) {
    admins[existingIndex].passwordHash = passwordHash;
    admins[existingIndex].updatedAt = now;
    saveAdmins(admins);
    console.log(`[OK] Administrator password updated for ${adminEmail}`);
  } else {
    console.log(`[OK] Existing administrator record found (Created: ${admins[existingIndex].createdAt})`);
    // Verify stored password hash
    const isValid = bcrypt.compareSync(defaultPassword, admins[existingIndex].passwordHash);
    console.log(`[CHECK] Default credentials match stored hash: ${isValid ? "PASSED" : "UPDATED"}`);
    if (!isValid) {
      admins[existingIndex].passwordHash = passwordHash;
      admins[existingIndex].updatedAt = now;
      saveAdmins(admins);
      console.log(`[SYNC] Stored hash synchronized with configured environment credentials.`);
    }
  }
} else {
  // Create initial administrator account
  const newRecord = {
    id: `admin-${Date.now()}`,
    email: adminEmail,
    passwordHash: passwordHash,
    role: "admin",
    createdAt: now,
    updatedAt: now,
  };
  admins.push(newRecord);
  saveAdmins(admins);
  console.log(`[OK] Created initial administrator record in database store.`);
}

console.log("==========================================");
console.log("Status: READY FOR AUTHENTICATION");
console.log("==========================================");
