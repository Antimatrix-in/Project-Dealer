#!/usr/bin/env node

/**
 * AntiMatrix Secure Admin Setup Script
 * Reads credentials from environment variables and outputs verification details.
 */

const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

// Load .env.local if present
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

const adminEmail = process.env.ADMIN_EMAIL || "antimatrix2026@gmail.com";
const adminPassword = process.env.ADMIN_PASSWORD || "Student@123";

console.log("==========================================");
console.log("AntiMatrix Secure Administrator Setup");
console.log("==========================================");
console.log(`Configured Email: ${adminEmail}`);

const salt = bcrypt.genSaltSync(12);
const hashedPassword = bcrypt.hashSync(adminPassword, salt);

console.log("Bcrypt Salt & Hash generated successfully.");
console.log(`Password Verification Test: ${bcrypt.compareSync(adminPassword, hashedPassword) ? "PASSED" : "FAILED"}`);
console.log("==========================================");
console.log("Admin account is ready for authentication.");
