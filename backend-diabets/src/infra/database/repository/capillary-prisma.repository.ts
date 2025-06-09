/* eslint-disable @typescript-eslint/no-floating-promises */
import { PrismaService } from '@app/infra/database/prisma.service';
import {
  CapillaryBloodGlucoseOutput,
  CapillaryMapper,
  UserResponse,
} from '../../../domain/mappers/capillary.mapper';
import { Logger, NotFoundException } from '@nestjs/common';
import { GlucoseResponse } from '@app/application/services/upload.service';
import { getPeriod } from '@app/infra/utils/format-period.utils';
import { formatTmz } from '@app/infra/utils/format-date-time.utils';
import { CapillaryInterface } from '@app/domain/interfaces/capillary.interface';
import { CreateCapillaryDTO } from '@app/application/dto/create.dto';
import { Prisma } from '@prisma/client';

export class CapillaryPrismaImplements implements CapillaryInterface {
  private logger: Logger;
  constructor(private readonly prisma: PrismaService) {
    this.logger = new Logger(CapillaryPrismaImplements.name);
  }

  async create(capillary: CreateCapillaryDTO): Promise<any> {
    const periodFormated = getPeriod();
    const today = new Date();
    const startOfDay = formatTmz(new Date(today.setHours(0, 0, 0, 0)));

    const endOfDay = formatTmz(new Date(today.setHours(23, 59, 59, 999)));

    const existing = await this.prisma.capillaryBloodGlucose.findFirst({
      where: {
        user_id: capillary.userId,
        period: periodFormated,
        date_time_collect: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existing) {
      return this.prisma.capillaryBloodGlucose.update({
        where: { id: existing.id },
        data: {
          value: capillary.value,
        },
      });
    }
    const createCapillary = await this.prisma.capillaryBloodGlucose.create({
      data: {
        date_time_collect: formatTmz(new Date()),
        value: capillary.value,
        user_id: capillary.userId,
        period: periodFormated,
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

  async findOneNew(id: number, data: GlucoseResponse): Promise<void> {
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

    // return CapillaryMapper.toResponseNewCollect(userResponse);
  }

  async findCapillary(
    id: number,
    dateInitial: string,
    dateFinal: string,
  ): Promise<UserResponse> {
    this.logger.log(id, dateInitial, dateFinal);

    const userRaw = await this.prisma.$queryRaw<any[]>(Prisma.sql`
      SELECT 
        us.id as user_id,
        us.name,
        us.email,
        cbg.id,
        cbg.value,
        cbg.date_time_collect,
        cbg.period,
        cbg.user_id as cbg_user_id
      FROM users us
      LEFT JOIN capillary_blood_glucose cbg 
        ON cbg.user_id = us.id
      WHERE us.id = ${id}
        AND cbg.date_time_collect::timestamptz BETWEEN ${new Date(dateInitial)} AND ${new Date(dateFinal)}
      ORDER BY cbg.date_time_collect::timestamptz DESC;
    `);

    const transformRaw = this.transformToUserWithGlucose(userRaw);

    return transformRaw;
  }

  transformToUserWithGlucose(data: any[]): UserResponse {
    if (data.length === 0) {
      throw new NotFoundException('User not Found');
    }
    const { user_id, name, email } = data[0];
    this.logger.log(user_id);

    const capillaryBloodGlucose = data.map((item) => ({
      id: item.id,
      userId: item.user_id,
      dateTimeCollect: item.date_time_collect,
      period: item.period,
      value: item.value,
    }));

    Promise.all(
      capillaryBloodGlucose.map((capillary) => {
        this.prisma.capillaryBloodGlucose.create({
          data: {
            value: capillary.value,
            period: capillary.period,
            date_time_collect: capillary.dateTimeCollect,
            user_id,
          },
        });
      }),
    );

    return {
      id: user_id,
      name,
      email,
      capillaryBloodGlucose,
    };
  }
}
