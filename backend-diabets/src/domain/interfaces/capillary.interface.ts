import { CreateCapillaryDTO } from '@app/application/dto/create.dto';
import { GlucoseResponse } from '@app/application/services/upload.service';

import { UserResponse } from '@app/domain/mappers/capillary.mapper';

export interface CapillaryInterface {
  create(capillary: CreateCapillaryDTO): Promise<any>;
  findOne(userId: number): Promise<any>;
  findOneNew(id: number, data: GlucoseResponse): Promise<any>;
  findCapillary(
    userId: number,
    dateInitial: string,
    dateFinal: string,
  ): Promise<UserResponse>;
}
