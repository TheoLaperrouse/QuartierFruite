import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authConfig = {
  prisma,
  secret: process.env.JWT_SECRET || "your-default-secret",
  saltRounds: 10,
  tokenExpiresIn: "15m",
  refreshTokenExpiresIn: "7d",
  userModel: "User",
  refreshTokenModel: "RefreshToken",
  userFields: {
    id: "id",
    email: "email",
    password: "password",
  },
};
