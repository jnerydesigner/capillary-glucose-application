/* eslint-disable @typescript-eslint/no-misused-promises */
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const logger = new Logger();

async function main() {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john_doe@email.com',
      password: '123456',
    },
  });

  logger.log('Seed Cocluida com sucesso');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
