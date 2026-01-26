import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  const fileName = "users.json";
  const filePath = path.join(dataDirectory, fileName);

  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const model = prisma.user; // explicitly target User model

  if (!model) {
    console.error("User model not found in Prisma Client");
    return;
  }

  for (const data of jsonData) {
    await model.create({
      data,
    });
  }

  console.log("Users seeded successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
