// Crea (o actualiza) los usuarios de prueba: un ADMIN y un USER. Uso: npm run seed
import "dotenv/config";
import bcrypt from "bcrypt";
import User from "./models/User";
import { connectMongoDB, disconnectMongoDB } from "./config/db";

const DEMO_PASSWORD = "123456";

const demoUsers = [
  { name: "Admin Demo", email: "admin@demo.com", role: "ADMIN" as const },
  { name: "User Demo", email: "user@demo.com", role: "USER" as const },
];

async function seed(): Promise<void> {
  await connectMongoDB();

  const password = await bcrypt.hash(DEMO_PASSWORD, 10);

  for (const demoUser of demoUsers) {
    await User.findOneAndUpdate(
      { email: demoUser.email },
      { ...demoUser, password },
      { upsert: true, runValidators: true }
    );
    console.log(`[seed] ${demoUser.role}: ${demoUser.email} / ${DEMO_PASSWORD}`);
  }

  await disconnectMongoDB();
}

seed().catch((error: unknown) => {
  console.error("[seed] failed:", error);
  process.exit(1);
});
