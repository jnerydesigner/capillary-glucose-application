/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { formatDateTime } from '@app/utils/format-date-time.utils';
import { CapillaryBloodGlucose } from '@prisma/client';
export class CapillaryMapper {
  static toResponse(
    capillary: CapillaryBloodGlucose,
  ): CapillaryBloodGlucoseOutput {
    return {
      id: capillary.id,
      value: capillary.value,
      dateTimeCollect: formatDateTime(capillary.date_time_collect),
      period: capillary.period,
      userId: capillary.user_id ? capillary.user_id : 1,
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
