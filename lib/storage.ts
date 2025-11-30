import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";

const DATA_DIR = path.join(process.cwd(), "data");
const WAITLIST_FILE = path.join(DATA_DIR, "waitlist.json");
const USERS_FILE = path.join(DATA_DIR, "users.json");

export interface WaitlistEntry {
  email: string;
  role: string;
  createdAt: string;
  grantedAccess: boolean;
  grantedAt?: string;
}

export interface User {
  email: string;
  role: string;
  password?: string; // Hashed password
  createdAt: string;
  grantedAt: string;
  lastLogin?: string;
}

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

// Waitlist operations
export async function getWaitlist(): Promise<WaitlistEntry[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(WAITLIST_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist yet, return empty array
    return [];
  }
}

export async function addToWaitlist(email: string, role: string): Promise<WaitlistEntry> {
  await ensureDataDir();
  const waitlist = await getWaitlist();
  
  // Check if email already exists
  const existing = waitlist.find((entry) => entry.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return existing;
  }

  const newEntry: WaitlistEntry = {
    email: email.toLowerCase(),
    role: role.toLowerCase(),
    createdAt: new Date().toISOString(),
    grantedAccess: false,
  };

  waitlist.push(newEntry);
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(waitlist, null, 2));
  
  return newEntry;
}

export async function grantAccess(email: string): Promise<void> {
  await ensureDataDir();
  const waitlist = await getWaitlist();
  const entry = waitlist.find((e) => e.email.toLowerCase() === email.toLowerCase());
  
  if (entry) {
    entry.grantedAccess = true;
    entry.grantedAt = new Date().toISOString();
    await fs.writeFile(WAITLIST_FILE, JSON.stringify(waitlist, null, 2));
  }
}

// User operations
export async function getUsers(): Promise<User[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function createUser(email: string, password: string, role: string): Promise<User> {
  await ensureDataDir();
  const users = await getUsers();
  
  // Check if user already exists
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    throw new Error("User already exists");
  }

  // Hash password with bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser: User = {
    email: email.toLowerCase(),
    role: role.toLowerCase(),
    password: hashedPassword,
    createdAt: new Date().toISOString(),
    grantedAt: new Date().toISOString(),
  };

  users.push(newUser);
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  
  // Also update waitlist entry
  await grantAccess(email);
  
  return newUser;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

