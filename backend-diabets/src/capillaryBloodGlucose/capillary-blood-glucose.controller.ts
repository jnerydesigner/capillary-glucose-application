import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CapillaryBloodGlucoseService } from './capillary-blood-glucose.service';
import { CreateCapillaryDTO } from './dto/create.dto';

@Controller('capillary')
export class CapillaryBloodGlucoseController {
  constructor(
    private readonly capillaryBloodGlucoseService: CapillaryBloodGlucoseService,
  ) {}
  @Post()
  capillaryCreate(@Body() body: CreateCapillaryDTO) {
    console.log(body.dateTime);
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
    console.log(dateInitial, dateFinal);
    return this.capillaryBloodGlucoseService.findCapillary(
      parseInt(userid),
      dateInitial,
      dateFinal,
    );
  }
}
