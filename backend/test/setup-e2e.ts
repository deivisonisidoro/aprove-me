import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$transaction([
    prisma.payable.deleteMany(),
    prisma.refreshToken.deleteMany(),
    prisma.assignor.deleteMany(),
  ]);
});

beforeEach(async () => {
  await prisma.$connect();
});

afterEach(async () => {
  await prisma.$transaction([
    prisma.payable.deleteMany(),
    prisma.refreshToken.deleteMany(),
    prisma.assignor.deleteMany(),
  ]);
});

afterAll(async () => {
  await prisma.$disconnect();
});
