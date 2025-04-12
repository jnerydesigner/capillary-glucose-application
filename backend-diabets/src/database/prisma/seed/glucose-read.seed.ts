/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { dataGlucose } from './data-glucose';

const prisma = new PrismaClient();
const logger = new Logger();

const data = dataGlucose;

async function main() {
  for (let i = 0; i < data.length; i++) {
    await prisma.capillaryBloodGlucose.create({
      data: {
        value: data[i].value,
        date_time_collect: data[i].date_time_collect,
        user_id: data[i].user_id,
        period: data[i].period,
      },
    });
  }

  logger.log('Seed Cocluida com sucesso');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
