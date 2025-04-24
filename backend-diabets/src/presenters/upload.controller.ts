import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  GlucoseRead,
  GlucoseResponse,
  UploadService,
} from '@app/application/services/upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ message: string; data: GlucoseResponse }> {
    if (!file || !file.mimetype.includes('csv')) {
      throw new Error('Por favor, envie um arquivo CSV válido.');
    }

    const csvData: GlucoseRead[] = await this.uploadService.processCsv(file);
    const glucoseData: GlucoseResponse =
      this.uploadService.transformToGlucoseResponse(csvData);
    await this.uploadService.saveJsonToFile(glucoseData, 'processed-data.json');
    await this.uploadService.deleteTempFile(file.path);
    return {
      message:
        'Arquivo processado, transformado e temporário excluído com sucesso',
      data: glucoseData,
    };
  }
}
