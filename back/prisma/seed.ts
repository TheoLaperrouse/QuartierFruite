import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const prisma = new PrismaClient();

async function main() {
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("password123", 12);

  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password,
      name: "Admin",
      role: "ADMIN",
    },
  });

  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      password,
      name: "User One",
      role: "USER",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@example.com",
      password,
      name: "User Two",
      role: "USER",
    },
  });

  console.log("Seed completed successfully!");
  console.log({ admin, user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
