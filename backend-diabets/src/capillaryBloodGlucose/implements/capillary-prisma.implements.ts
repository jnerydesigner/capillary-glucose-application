import { CapillaryInterface } from '../interfaces/capillary.interface';
import { CreateCapillaryDTO } from '../dto/create.dto';
import { PrismaService } from '@app/database/prisma.service';
import {
  CapillaryBloodGlucoseOutput,
  CapillaryMapper,
} from '../mapper/capillary.mapper';

export class CapillaryPrismaImplements implements CapillaryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(capillary: CreateCapillaryDTO): Promise<any> {
    const createCapillary = await this.prisma.capillaryBloodGlucose.create({
      data: {
        date_time_collect: capillary.dateTime,
        value: capillary.value,
        user_id: capillary.userId,
        period: capillary.period,
      },
    });

    return createCapillary;
  }

  async findOne(userId: number): Promise<CapillaryBloodGlucoseOutput[]> {
    const findAllUserId = await this.prisma.capillaryBloodGlucose.findMany({
      where: {
        user_id: userId,
      },
    });

    return findAllUserId.map((capillary) => {
      return CapillaryMapper.toResponse(capillary);
    });
  }
}
