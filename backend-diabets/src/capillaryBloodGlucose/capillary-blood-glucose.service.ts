import { Inject, Injectable } from '@nestjs/common';
import { CreateCapillaryDTO } from './dto/create.dto';
import { CapillaryInterface } from './interfaces/capillary.interface';

@Injectable()
export class CapillaryBloodGlucoseService {
  constructor(
    @Inject('CAPILLARY_REPOSITORY')
    private readonly capillaryRepository: CapillaryInterface,
  ) {}
  create(input: CreateCapillaryDTO) {
    return this.capillaryRepository.create(input);
  }

  findOne(userId: number) {
    return this.capillaryRepository.findOne(userId);
  }
}
