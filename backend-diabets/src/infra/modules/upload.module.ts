import { UploadService } from '@app/application/services/upload.service';
import { UploadController } from '@app/presenters/upload.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
