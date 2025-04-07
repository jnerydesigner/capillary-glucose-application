import { CapillaryInterface } from '../interfaces/capillary.interface';
import { CreateCapillaryDTO } from '../dto/create.dto';
import { PrismaService } from '@app/database/prisma.service';
import {
  CapillaryBloodGlucoseOutput,
  CapillaryMapper,
  UserResponse,
} from '../mapper/capillary.mapper';
import { Logger, NotFoundException } from '@nestjs/common';
import { GlucoseResponse } from '@app/upload/upload.service';

export class CapillaryPrismaImplements implements CapillaryInterface {
  private logger: Logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(CapillaryPrismaImplements.name);
  }

  async create(capillary: CreateCapillaryDTO): Promise<any> {
    await this.prisma.capillaryBloodGlucose.deleteMany({
      where: {
        period: capillary.period,
      },
    });
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

  async findOneNew(id: number, data: GlucoseResponse): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const dataResponse = data.glucose.map((gli) => {
      return CapillaryMapper.toPersistentJson(user, gli);
    });

    await this.prisma.capillaryBloodGlucose.createMany({
      data: dataResponse,
    });

    const userResponse = await this.prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        capillary_blood_glucose: true,
      },
    });

    if (!userResponse) {
      throw new NotFoundException();
    }

    return CapillaryMapper.toResponseNewCollect(userResponse);
  }

  async findCapillary(
    id: number,
    dateInitial: string,
    dateFinal: string,
  ): Promise<UserResponse> {
    const userResponse = await this.prisma.user.findFirst({
      where: {
        id,
      },

      include: {
        capillary_blood_glucose: {
          where: {
            date_time_collect: {
              gte: new Date(dateInitial),
              lte: new Date(dateFinal),
            },
          },
          orderBy: {
            date_time_collect: 'desc',
          },
        },
      },
    });

    if (!userResponse) {
      throw new NotFoundException();
    }
    return CapillaryMapper.toResponseNewCollect(userResponse);
  }
}
