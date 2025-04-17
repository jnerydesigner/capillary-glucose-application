import { Module } from '@nestjs/common';
import { ReportService } from './report.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportsModule {}
