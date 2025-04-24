import { Module } from '@nestjs/common';
import { PrismaService } from '@app/infra/database/prisma.service';

import { ReportService } from '@app/application/services/report.service';
import { CapillaryBloodGlucoseController } from '@app/presenters/capillary-blood-glucose.controller';
import { CapillaryBloodGlucoseService } from '@app/application/services/capillary-blood-glucose.service';
import { CapillaryPrismaImplements } from '../database/repository/capillary-prisma.repository';

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
    ReportService,
  ],
})
export class CapillaryBloodGlucoseModule {}
