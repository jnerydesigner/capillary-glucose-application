import { FormatDateBR } from '@app/utils/format-date-time.utils';
import { transformGlucoseAscending } from '@app/utils/transformed-data';
import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class ReportService {
  private logger: Logger;
  private printer: PdfPrinter;

  constructor() {
    this.logger = new Logger(ReportService.name);

    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };

    this.printer = new PdfPrinter(fonts);
  }

  generateTitlesHeaderTable() {
    const titles: TitleType[] = [];
    const titlesProps = [
      'Data',
      '06:00',
      '08:00',
      '11:00',
      '13:00',
      '18:00',
      '22:00',
    ];

    for (let i = 0; i < titlesProps.length; i++) {
      titles.push({
        text: titlesProps[i],
        alignment: 'center',
        bold: true,
        color: '#fff',
      });
    }

    return titles;
  }

  generateReport(data: any, datePeriodFormated: string) {
    console.log(datePeriodFormated);
    const glucoseRead = transformGlucoseAscending(data.capillaryBloodGlucose);

    const titles = this.generateTitlesHeaderTable();
    const tableBody = [titles];

    glucoseRead.forEach((entry) => {
      const row = [
        {
          text: FormatDateBR(entry.date),
          alignment: 'center',
          color: '#000',
          bold: false,
          fillColor: '#ffffff',
        } as const,
      ];
      ['06:00', '08:00', '11:00', '13:00', '18:00', '22:00'].forEach((time) => {
        row.push({
          text: entry[time] !== null ? entry[time].toString() : '',
          alignment: 'center',
          color: '#000',
          bold: false,
          fillColor: '#ffffff',
        } as const);
      });
      tableBody.push(row);
    });

    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          text: 'Medição de Glicose',
          style: 'header',
          alignment: 'center',
        },
        {
          style: 'headerName',
          table: {
            widths: [110, '*'],
            body: [
              [
                {
                  text: 'Name:',
                  border: [false, false, false, false],
                },
                {
                  text: data.name,
                  border: [false, false, false, false],
                },
              ],
            ],
          },
        },
        {
          style: 'headerName',
          table: {
            widths: [110, '*'],
            body: [
              [
                {
                  text: 'Periodo da medição:',
                  border: [false, false, false, false],
                },
                {
                  text: datePeriodFormated,
                  border: [false, false, false, false],
                },
              ],
            ],
          },
        },
        {
          style: 'headerGlucoseTtitles',
          table: {
            widths: [100, 70, 70, 70, 70, 70, 70, 70],
            body: tableBody,
          },
          layout: {
            hLineWidth: function () {
              return 0.5;
            },
            vLineWidth: function () {
              return 0.5;
            },
          },
        },
      ],
      defaultStyle: {
        font: 'Helvetica',
      },
      pageMargins: [4, 4, 4, 4],
      styles: {
        headerName: {
          margin: [0, 6, 0, 6],
        },
        headerGlucoseTtitles: {
          margin: [0, 6, 0, 6],
          fillColor: '#8e44ad',
        },
      },
    };

    const pdfDoc = this.printer.createPdfKitDocument(docDefinition);
    const writeStream = fs.createWriteStream('output.pdf');

    pdfDoc.pipe(writeStream);
    pdfDoc.end();

    writeStream.on('finish', () => {
      this.logger.log(
        'PDF document created and saved as output.pdf successfully.',
      );
    });
  }
}
type TitleType = {
  text: string;
  alignment: 'center' | 'justify';
  color: string;
  bold: boolean;
  fillColor?: string;
};
