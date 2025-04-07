import { GlucoseResponse } from '@app/upload/upload.service';
import { CreateCapillaryDTO } from '../dto/create.dto';
import { UserResponse } from '../mapper/capillary.mapper';

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
