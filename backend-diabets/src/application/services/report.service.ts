import { FormatDateBR } from '@app/infra/utils/format-date-time.utils';
import { transformGlucoseAscending } from '@app/infra/utils/transformed-data';
import { Injectable, Logger } from '@nestjs/common';

import * as path from 'path';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Response } from 'express';

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

  generateReport(data: any, datePeriodFormated: string, res: Response) {
    const imagePathLogo = path.resolve(
      'src',
      'application',
      'assets',
      'sangue-doce-logo-redondo.png',
    );

    console.log(imagePathLogo);

    const glucoseRead = transformGlucoseAscending(data.capillaryBloodGlucose);

    console.log('glucoseRead', JSON.stringify(glucoseRead));

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
        const fontColor: any =
          entry[time] !== null && Number(entry[time]) > 180
            ? '#e74c3c'
            : '#000';

        const fillColor: any =
          entry[time] !== null && Number(entry[time]) > 180
            ? '#ffffff'
            : '#ffffff';

        const bold: any =
          entry[time] !== null && Number(entry[time]) > 180 ? true : false;
        row.push({
          text: entry[time] !== null ? entry[time].toString() : ' - ',
          alignment: 'center',
          color: fontColor,
          bold: bold,
          fillColor: fillColor,
        } as const);
      });
      tableBody.push(row);
    });

    const docDefinition: TDocumentDefinitions = {
      content: [
        // {
        //   image: imagePathLogo,
        //   width: 70,
        //   alignment: 'center',
        //   margin: [0, 0, 0, 6],
        // },
        {
          text: 'Medição de Glicose',
          style: 'header',
          alignment: 'center',
          fontSize: 18,
          bold: true,
          margin: [0, 4, 0, 4],
        },
        {
          style: 'headerName',
          table: {
            widths: [130, '*'],
            body: [
              [
                {
                  text: 'Nome: ',
                  border: [false, false, false, false],
                },
                {
                  text: data.name,
                  border: [false, false, false, false],
                  bold: true,
                },
              ],
            ],
          },
        },
        {
          style: 'headerName',
          table: {
            widths: [130, '*'],
            body: [
              [
                {
                  text: 'Período da medição: ',
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
          style: 'headerGlucoseTitles',
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
      pageMargins: [5, 30, 5, 20],
      styles: {
        headerName: {
          margin: [0, 6, 0, 6],
        },
        headerGlucoseTitles: {
          margin: [0, 6, 0, 6],
          fillColor: '#8e44ad',
        },
      },
    };

    const pdfDoc = this.printer.createPdfKitDocument(docDefinition);
    const chunks: Buffer[] = [];
    pdfDoc.on('data', (chunk) => {
      chunks.push(chunk); // Collect data chunks
    });

    pdfDoc.on('end', () => {
      const pdfBuffer = Buffer.concat(chunks); // Combine the chunks into a single buffer
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="glicose-report.pdf"',
      );
      res.send(pdfBuffer); // Send the PDF as a response
    });

    pdfDoc.end();

    // const writeStream = fs.createWriteStream('output.pdf');

    // pdfDoc.pipe(writeStream);
    // pdfDoc.end();

    // writeStream.on('finish', () => {
    //   this.logger.log(
    //     'PDF document created and saved as output.pdf successfully.',
    //   );
    // });
  }
}
type TitleType = {
  text: string;
  alignment: 'center' | 'justify';
  color: string;
  bold: boolean;
  fillColor?: string;
};
