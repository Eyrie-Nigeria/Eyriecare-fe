import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };


// Waitlist operations
export async function getWaitlist() {
  return prisma.waitlistEntry.findMany();
}

export async function addToWaitlist(email: string, role: string) {
  const existing = await prisma.waitlistEntry.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (existing) return existing;

  return prisma.waitlistEntry.create({
    data: {
      email: email.toLowerCase(),
      role: role.toLowerCase(),
    },
  });
}

export async function grantAccess(email: string) {
  const entry = await prisma.waitlistEntry.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!entry) return;

  await prisma.waitlistEntry.update({
    where: { email: email.toLowerCase() },
    data: {
      grantedAccess: true,
      grantedAt: new Date(),
    },
  });
}

// User operations
export async function getUsers() {
  return prisma.user.findMany();
}

export async function createUser(email: string, password: string, role: string) {
  const existing = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role.toLowerCase(),
      grantedAt: new Date(),
    },
  });

  // Grant access in waitlist
  await grantAccess(email);

  return user;
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
}
