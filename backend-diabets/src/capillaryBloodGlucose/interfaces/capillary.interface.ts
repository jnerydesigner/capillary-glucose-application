import { CreateCapillaryDTO } from '../dto/create.dto';

export interface CapillaryInterface {
  create(capillary: CreateCapillaryDTO): Promise<any>;
  findOne(userId: number): Promise<any>;
}
