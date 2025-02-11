import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

function createPrisma() {
  return new PrismaClient().$extends(withAccelerate());
}

const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof createPrisma>;
};

export const prisma = globalForPrisma.prisma || createPrisma();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
