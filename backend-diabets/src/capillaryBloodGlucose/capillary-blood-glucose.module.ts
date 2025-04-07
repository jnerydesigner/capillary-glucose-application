import { CapillaryBloodGlucoseService } from './capillary-blood-glucose.service';
import { CapillaryBloodGlucoseController } from './capillary-blood-glucose.controller';
import { Module } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import { CapillaryPrismaImplements } from './repository/capillary-prisma.repository';

@Module({
  imports: [],
  controllers: [CapillaryBloodGlucoseController],
  providers: [
    CapillaryBloodGlucoseService,
    {
      provide: 'CAPILLARY_REPOSITORY',
      useFactory: (prisma: PrismaService) => {
        return new CapillaryPrismaImplements(prisma);
      },
      inject: [PrismaService],
    },
  ],
})
export class CapillaryBloodGlucoseModule {}
