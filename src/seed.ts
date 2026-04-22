import "dotenv/config";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { pbkdf2Sync, randomUUID } from "node:crypto";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function hashPassword(password: string): string {
  const salt = process.env.ADMIN_PASSWORD_SALT ?? "auto-repair-salt";
  return pbkdf2Sync(password, salt, 100_000, 32, "sha256").toString("hex");
}

const email = process.env.SEED_ADMIN_EMAIL ?? "admin@email.com";
const password = process.env.SEED_ADMIN_PASSWORD ?? "@Abc1234";

try {
  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: {
      id: randomUUID(),
      name: "Admin",
      email,
      passwordHash: hashPassword(password),
      role: "ADMIN",
    },
  });

  console.log(`[seed] Default admin ensured: ${email}`);
} catch (e) {
  console.error("[seed] Failed:", e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
  await pool.end();
}
