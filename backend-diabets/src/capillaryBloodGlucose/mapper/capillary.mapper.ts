import { CapillaryBloodGlucose, Prisma, User } from '@prisma/client';
import { GlucoseMeasurement } from '@app/upload/upload.service';

type UserWithGlucose = Prisma.UserGetPayload<{
  include: { capillary_blood_glucose: true };
}>;

export class CapillaryMapper {
  static toResponse(
    capillary: CapillaryBloodGlucose,
  ): CapillaryBloodGlucoseOutput {
    return {
      id: capillary.id,
      value: capillary.value,
      dateTimeCollect: capillary.date_time_collect,
      period: capillary.period,
      userId: capillary.user_id ? capillary.user_id : 1,
    };
  }

  static toPersistentJson(
    user: User,
    glucose: GlucoseMeasurement,
  ): PersistentDataTypeUserGlucose {
    return {
      user_id: user.id,
      value: glucose.value,
      date_time_collect: DataHourJoin(glucose.data, glucose.hora),
      period: glucose.hora,
    };
  }

  static toResponseNewCollect(user: UserWithGlucose): UserResponse {
    return {
      id: user.id,
      name: user.name ? user.name : '',
      email: user.email,
      capillaryBloodGlucose: user.capillary_blood_glucose.map((capillary) => {
        return {
          id: capillary.id,
          userId: capillary.user_id ? capillary.user_id : 1,
          dateTimeCollect: capillary.date_time_collect,
          period: capillary.period,
          value: capillary.value,
        };
      }),
    };
  }
}

export type CapillaryBloodGlucoseOutput = {
  id: number;
  value: number;
  dateTimeCollect: string;
  period: string;
  userId: number;
};

export type PersistentDataTypeUserGlucose = {
  user_id: number;
  value: number;
  date_time_collect: string;
  period: string;
};

export const DataHourJoin = (date: string, hour: string): string => {
  const dateSplit = date.split('/');
  const yearSplit = dateSplit[2];
  const monthSplit = dateSplit[1];
  const daySplit = dateSplit[0];

  const isoString = `${yearSplit}-${monthSplit}-${daySplit}T${hour}:00.447Z`;
  return isoString;
};

interface CapillaryBloodGlucoseResponse {
  id: number;
  value: number;
  dateTimeCollect: string;
  period: string;
  userId: number;
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  password?: string;
  capillaryBloodGlucose: CapillaryBloodGlucoseResponse[];
}
