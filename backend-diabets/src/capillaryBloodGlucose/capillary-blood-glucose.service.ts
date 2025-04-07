import { Inject, Injectable } from '@nestjs/common';
import { CreateCapillaryDTO } from './dto/create.dto';
import { CapillaryInterface } from './interfaces/capillary.interface';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { GlucoseResponse } from '@app/upload/upload.service';
import { getPeriod } from '@app/utils/format-period.utils';

@Injectable()
export class CapillaryBloodGlucoseService {
  constructor(
    @Inject('CAPILLARY_REPOSITORY')
    private readonly capillaryRepository: CapillaryInterface,
  ) {}
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
    const pathJson = path.join(__dirname, '..', '..', 'uploads', filename);

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
    return this.capillaryRepository.findCapillary(
      userId,
      dateInitial,
      dateFinal,
    );
  }
}
