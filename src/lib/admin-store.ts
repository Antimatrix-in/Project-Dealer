import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { isSupabaseConfigured, supabase } from "./supabase";

export interface AdminAccount {
  id: string;
  username?: string;
  email: string;
  passwordHash: string;
  role: "admin";
  createdAt: string;
  updatedAt: string;
}

const STORE_PATH = path.join(process.cwd(), "src", "data", "admin-store.json");

/**
 * Load admin accounts from local persistent storage
 */
export function getLocalAdminAccounts(): AdminAccount[] {
  try {
    if (!fs.existsSync(STORE_PATH)) {
      return [];
    }
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.warn("[AUTH STORE] Error reading local admin accounts:", err);
    return [];
  }
}

/**
 * Save admin accounts to local persistent storage
 */
export function saveLocalAdminAccounts(accounts: AdminAccount[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(accounts, null, 2), "utf-8");
  } catch (err) {
    console.error("[AUTH STORE] Error writing to admin store:", err);
  }
}

/**
 * Find admin account by email from Supabase or local persistent store
 */
export async function findAdminByEmail(email: string): Promise<AdminAccount | null> {
  const normalized = email.trim().toLowerCase();

  // 1. Try Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", normalized)
        .maybeSingle();

      if (!error && data) {
        return {
          id: data.id,
          username: data.username?.toLowerCase() || (process.env.ADMIN_USERNAME || "antimatrix2026"),
          email: data.email.toLowerCase(),
          passwordHash: data.password_hash,
          role: "admin",
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    } catch (err) {
      console.warn("[AUTH STORE] Supabase admin lookup failed, falling back to local store");
    }
  }

  // 2. Fall back to local persistent store
  const accounts = getLocalAdminAccounts();
  const found = accounts.find((a) => a.email.toLowerCase() === normalized);
  return found || null;
}

/**
 * Find admin account by username or email identifier
 */
export async function findAdminByIdentifier(identifier: string): Promise<AdminAccount | null> {
  const normalized = identifier.trim().toLowerCase();
  const configuredUsername = (process.env.ADMIN_USERNAME || "antimatrix2026").trim().toLowerCase();
  const configuredEmail = (process.env.ADMIN_EMAIL || "antimatrix2026@gmail.com").trim().toLowerCase();

  // 1. Check local persistent store
  const accounts = getLocalAdminAccounts();
  const found = accounts.find((a) => {
    const emailMatch = a.email.toLowerCase() === normalized;
    const usernameMatch = a.username && a.username.toLowerCase() === normalized;
    const aliasMatch = normalized === configuredUsername && a.email.toLowerCase() === configuredEmail;
    return emailMatch || usernameMatch || aliasMatch;
  });

  if (found) {
    return found;
  }

  // 2. Try Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .or(`email.eq.${normalized},username.eq.${normalized}`)
        .maybeSingle();

      if (!error && data) {
        return {
          id: data.id,
          username: data.username?.toLowerCase() || configuredUsername,
          email: data.email.toLowerCase(),
          passwordHash: data.password_hash,
          role: "admin",
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    } catch (err) {
      console.warn("[AUTH STORE] Supabase admin lookup failed, falling back to local store");
    }
  }

  // 3. Fallback to direct email search
  const byEmail = await findAdminByEmail(normalized);
  if (byEmail) {
    return byEmail;
  }

  // 4. If identifier matches configured username or email, ensure account exists
  if (normalized === configuredUsername || normalized === configuredEmail) {
    return await ensureAdminAccount();
  }

  return null;
}

/**
 * Ensure an initial administrator account exists without overwriting existing accounts
 */
export async function ensureAdminAccount(): Promise<AdminAccount> {
  const adminUsername = (process.env.ADMIN_USERNAME || "antimatrix2026").trim().toLowerCase();
  const adminEmail = (process.env.ADMIN_EMAIL || "antimatrix2026@gmail.com").trim().toLowerCase();
  const existing = await findAdminByEmail(adminEmail);

  if (existing) {
    if (!existing.username) {
      existing.username = adminUsername;
      const accounts = getLocalAdminAccounts();
      const idx = accounts.findIndex((a) => a.email.toLowerCase() === adminEmail);
      if (idx !== -1) {
        accounts[idx].username = adminUsername;
        saveLocalAdminAccounts(accounts);
      }
    }
    return existing;
  }

  // Generate initial credentials from environment
  const rawPassword =
    process.env.ADMIN_PASSWORD ||
    process.env.EMAIL_PASSWORD ||
    "antimatrix2026@";

  const passwordHash = bcrypt.hashSync(rawPassword, 10);
  const now = new Date().toISOString();

  const newAdmin: AdminAccount = {
    id: `admin-${Date.now()}`,
    username: adminUsername,
    email: adminEmail,
    passwordHash,
    role: "admin",
    createdAt: now,
    updatedAt: now,
  };

  // Save to local store
  const accounts = getLocalAdminAccounts();
  accounts.push(newAdmin);
  saveLocalAdminAccounts(accounts);

  // Sync to Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("admin_users").insert([
        {
          username: adminUsername,
          email: adminEmail,
          password_hash: passwordHash,
          role: "admin",
        },
      ]);
    } catch (err) {
      console.warn("[AUTH STORE] Failed to sync new admin to Supabase:", err);
    }
  }

  console.log(`[AUTH STORE] Initial administrator account configured for ${adminUsername} (${adminEmail})`);
  return newAdmin;
}

/**
 * Update an administrator's password
 */
export async function updateAdminPassword(email: string, newPassword: string): Promise<boolean> {
  const normalized = email.trim().toLowerCase();
  const passwordHash = bcrypt.hashSync(newPassword, 10);
  const now = new Date().toISOString();

  let updated = false;

  // Update in local store
  const accounts = getLocalAdminAccounts();
  const index = accounts.findIndex((a) => a.email.toLowerCase() === normalized);

  if (index !== -1) {
    accounts[index].passwordHash = passwordHash;
    accounts[index].updatedAt = now;
    saveLocalAdminAccounts(accounts);
    updated = true;
  } else {
    // If not found in local store, create it
    accounts.push({
      id: `admin-${Date.now()}`,
      email: normalized,
      passwordHash,
      role: "admin",
      createdAt: now,
      updatedAt: now,
    });
    saveLocalAdminAccounts(accounts);
    updated = true;
  }

  // Update in Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from("admin_users")
        .update({
          password_hash: passwordHash,
          updated_at: now,
        })
        .eq("email", normalized);
    } catch (err) {
      console.warn("[AUTH STORE] Supabase password update sync failed:", err);
    }
  }

  return updated;
}
