import { ReportService } from '@app/application/services/report.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportsModule {}
