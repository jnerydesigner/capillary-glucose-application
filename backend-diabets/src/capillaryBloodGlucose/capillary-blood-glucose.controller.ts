import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CapillaryBloodGlucoseService } from './capillary-blood-glucose.service';
import { CreateCapillaryDTO } from './dto/create.dto';

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
}
