import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient();

beforeAll(async () => {
  process.env.DATABASE_URL = 'file:./test.db';

  execSync(`npx prisma migrate deploy`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: process.env.DATABASE_URL,
    },
  });
  await prisma.payable.deleteMany();
  await prisma.assignor.deleteMany();
});

afterAll(async () => {
  await prisma.payable.deleteMany();
  await prisma.assignor.deleteMany();
  await prisma.$disconnect();
});
