import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';

export type GlucoseRead = {
  Data: string;
  '06:00:00': string;
  '08:00:00': string;
  '11:00:00': string;
  '13:00:00': string;
  '18:00:00': string;
  '22:00:00': string;
};

export type GlucoseMeasurement = {
  data: string;
  hora: string;
  value: number;
};

export type GlucoseResponse = {
  glucose: GlucoseMeasurement[];
};

@Injectable()
export class UploadService {
  async processCsv(file: Express.Multer.File): Promise<GlucoseRead[]> {
    const csvData: GlucoseRead[] = [];
    const expectedColumns = [
      'Data',
      '06:00:00',
      '08:00:00',
      '11:00:00',
      '13:00:00',
      '18:00:00',
      '22:00:00',
    ];

    return new Promise((resolve, reject) => {
      fs.createReadStream(file.path)
        .pipe(
          parse({
            columns: (header) => {
              if (
                !header.every((col: string) => expectedColumns.includes(col))
              ) {
                throw new Error(
                  'Cabeçalhos do CSV não correspondem ao formato esperado.',
                );
              }
              return header;
            },
            trim: true,
            cast: (value) => String(value),
          }),
        )
        .on('data', (row: GlucoseRead) => {
          csvData.push(row);
        })
        .on('end', () => {
          resolve(csvData);
        })
        .on('error', (error) => reject(error));
    });
  }

  // Novo método para transformar GlucoseRead[] em GlucoseResponse
  transformToGlucoseResponse(csvData: GlucoseRead[]): GlucoseResponse {
    const glucose: GlucoseMeasurement[] = [];

    // Horários que vamos mapear
    const hoursMap: { [key: string]: string } = {
      '06:00:00': '06:00',
      '08:00:00': '08:00',
      '11:00:00': '11:00',
      '13:00:00': '13:00',
      '18:00:00': '18:00',
      '22:00:00': '22:00',
    };

    // Para cada linha do CSV
    csvData.forEach((row) => {
      // Para cada horário
      Object.keys(hoursMap).forEach((hourKey) => {
        const measurement: GlucoseMeasurement = {
          data: row.Data, // Data no formato DD/MM/YYYY
          hora: hoursMap[hourKey], // Converte 06:00:00 para 06:00
          value: parseInt(row[hourKey as keyof GlucoseRead], 10), // Converte o valor para número
        };
        glucose.push(measurement);
      });
    });

    return { glucose };
  }

  async saveJsonToFile(
    data: GlucoseResponse,
    filename: string = 'output.json',
  ): Promise<void> {
    const outputPath = path.resolve('uploads', filename);
    return new Promise((resolve, reject) => {
      fs.writeFile(
        outputPath,
        JSON.stringify(data, null, 2),
        'utf-8',
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        },
      );
    });
  }

  async deleteTempFile(filePath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}
