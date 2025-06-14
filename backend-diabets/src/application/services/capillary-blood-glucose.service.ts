import { Inject, Injectable, Logger } from '@nestjs/common';

import * as fs from 'node:fs';
import { GlucoseResponse } from '@app/application/services/upload.service';
import { getPeriod } from '@app/infra/utils/format-period.utils';
import path from 'node:path';
import { ReportService } from '@app/application/services/report.service';
import { DatePeriodFormated } from '@app/infra/utils/format-date-time.utils';
import { CapillaryInterface } from '@app/domain/interfaces/capillary.interface';
import { CreateCapillaryDTO } from '@app/application/dto/create.dto';
import { Response } from 'express';

@Injectable()
export class CapillaryBloodGlucoseService {
  private logger: Logger;
  constructor(
    @Inject('CAPILLARY_REPOSITORY')
    private readonly capillaryRepository: CapillaryInterface,
    private readonly reportService: ReportService,
  ) {
    this.logger = new Logger(CapillaryBloodGlucoseService.name);
  }
  create(input: CreateCapillaryDTO) {
    const periodFormated = getPeriod();

    const inputNew = {
      ...input,
      period: periodFormated,
    };

    return this.capillaryRepository.create(inputNew);
  }

  findOne(userId: number) {
    return this.capillaryRepository.findOne(userId);
  }

  async findOneNew(userId: number) {
    const readGlucose = await this.createGlucoseCsv();

    return this.capillaryRepository.findOneNew(userId, readGlucose);
  }

  async createGlucoseCsv(): Promise<GlucoseResponse> {
    const filename = 'processed-data.json';
    const pathJson = path.resolve('uploads', filename);

    return new Promise((resolve, reject) => {
      fs.readFile(pathJson, 'utf-8', (error, data) => {
        if (error) {
          reject(error);
        } else {
          try {
            const jsonData = JSON.parse(data) as GlucoseResponse;
            resolve(jsonData);
          } catch (parseError: unknown) {
            if (parseError instanceof Error) {
              reject(
                new Error('Erro ao parsear o JSON: ' + parseError.message),
              );
            } else {
              reject(new Error('Erro ao parsear o JSON: erro desconhecido'));
            }
          }
        }
      });
    });
  }

  async findCapillary(userId: number, dateInitial: string, dateFinal: string) {
    this.logger.log(userId + ' - ' + dateInitial + ' : ' + dateFinal);
    const response = await this.capillaryRepository.findCapillary(
      userId,
      dateInitial,
      dateFinal,
    );

    this.logger.log(JSON.stringify(response));

    return response;
  }

  async generateReport(
    userId: number,
    dateInitial: string,
    dateFinal: string,
    res: Response,
  ) {
    const response = await this.capillaryRepository.findCapillary(
      userId,
      dateInitial,
      dateFinal,
    );

    this.logger.log('Response: ' + JSON.stringify(response));
    const datePeriodFormated = DatePeriodFormated(dateInitial, dateFinal);

    this.reportService.generateReport(response, datePeriodFormated, res);
    return null;
  }
}
