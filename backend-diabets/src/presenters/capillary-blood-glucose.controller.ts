import { CreateCapillaryDTO } from '@app/application/dto/create.dto';
import { CapillaryBloodGlucoseService } from '@app/application/services/capillary-blood-glucose.service';
import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('capillary')
export class CapillaryBloodGlucoseController {
  constructor(
    private readonly capillaryBloodGlucoseService: CapillaryBloodGlucoseService,
  ) {}
  @Post()
  capillaryCreate(@Body() body: CreateCapillaryDTO) {
    return this.capillaryBloodGlucoseService.create(body);
  }

  @Get('/:userId')
  findOne(@Param('userId') userid: string) {
    return this.capillaryBloodGlucoseService.findOne(parseInt(userid));
  }
  @Post('/:userId/new')
  async findOneNew(@Param('userId') userid: string) {
    return this.capillaryBloodGlucoseService.findOneNew(parseInt(userid));
  }

  @Get('/:userId/capillary')
  async findOneNewCapillary(
    @Param('userId') userid: string,
    @Query('dateInitial') dateInitial: string,
    @Query('dateFinal') dateFinal: string,
  ) {
    return this.capillaryBloodGlucoseService.findCapillary(
      parseInt(userid),
      dateInitial,
      dateFinal,
    );
  }

  @Get('/:userId/capillary/report')
  async generateReportCapillary(
    @Param('userId') userid: string,
    @Query('dateInitial') dateInitial: string,
    @Query('dateFinal') dateFinal: string,
    @Res() res: Response,
  ) {
    console.log(dateInitial, dateFinal);
    return this.capillaryBloodGlucoseService.generateReport(
      parseInt(userid),
      dateInitial,
      dateFinal,
      res,
    );
  }
}
