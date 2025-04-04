import { formatDateTime } from '@app/utils/format-date-time.utils';
import { CapillaryBloodGlucose, User } from '@prisma/client';

// Define all interfaces
interface RawUser {
  id: number;
  email: string;
  name: string;
  capillary_blood_glucose: CapillaryBloodGlucose[];
}

interface InputCapillary {
  capillaryId: number;
  value: number;
  dateTimeCollect: string;
  period: string;
}

interface InputUser {
  userId: number;
  email: string;
  name: string;
  capillary: InputCapillary[];
}

interface OutputCapillaryGlucose {
  value: number;
  dateTimeCollect: string;
}

interface OutputCapillary {
  period: string;
  capillaryGlucose: OutputCapillaryGlucose[];
}

export interface OutputUserScreen {
  userId: number;
  email: string;
  name: string;
  capillary: OutputCapillary[];
}

export interface RawUserSimple extends Omit<User, 'password'> {
  id: number;
  email: string;
  name: string;
}

export class UsersMapper {
  static toUserResponse({ id, email, name }: RawUserSimple): RawUserSimple {
    return {
      id,
      email,
      name,
    };
  }
  static toResponse(user: RawUser): OutputUserScreen {
    const mappedCapillary: InputCapillary[] = user.capillary_blood_glucose.map(
      (capillary: CapillaryBloodGlucose) => ({
        capillaryId: capillary.id,
        value: capillary.value,
        dateTimeCollect: formatDateTime(capillary.date_time_collect),
        period: capillary.period,
      }),
    );

    const response: InputUser = {
      userId: user.id,
      email: user.email,
      name: user.name,
      capillary: mappedCapillary,
    };

    return UsersMapper.transformUserData(response);
  }

  static transformUserData(input: InputUser): OutputUserScreen {
    const defaultPeriods = [
      '06:00',
      '08:00',
      '11:00',
      '13:00',
      '18:00',
      '22:00',
    ];

    const periodMap = new Map<string, OutputCapillaryGlucose[]>();

    input.capillary.forEach((cap: InputCapillary) => {
      const glucoseData: OutputCapillaryGlucose = {
        value: cap.value,
        dateTimeCollect: cap.dateTimeCollect,
      };
      const existing = periodMap.get(cap.period);
      if (existing) {
        existing.push(glucoseData);
      } else {
        periodMap.set(cap.period, [glucoseData]);
      }
    });

    const capillaryOutput: OutputCapillary[] = defaultPeriods.map((period) => {
      const existingData: OutputCapillaryGlucose[] =
        periodMap.get(period) || [];
      const capillaryGlucose: OutputCapillaryGlucose[] =
        existingData.length > 0
          ? existingData
          : [
              {
                value: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
                dateTimeCollect: '28/03/2025',
              },
              {
                value: Math.floor(Math.random() * (200 - 100 + 1)) + 100,
                dateTimeCollect: '29/03/2025',
              },
            ];

      return {
        period,
        capillaryGlucose,
      };
    });

    return {
      userId: input.userId,
      email: input.email,
      name: input.name,
      capillary: capillaryOutput,
    };
  }
}
