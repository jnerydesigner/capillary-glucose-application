import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';

const formatTmz = (data: string | Date) => {
  const date = typeof data === 'string' ? new Date(data) : data;
  const tz = toZonedTime(date, 'America/Manaus');
  const formattedDate = format(tz, 'yyyy-MM-dd HH:mm:ss.SSS');
  return formattedDate;
};

export type CapillaryBloodGlucoseType = {
  value: number;
  date_time_collect: string;
  period: string;
  user_id: number;
};

const createManausDate = (dateString: string) => {
  return new Date(dateString); // Apenas cria a data corretamente
};

export const dataGlucose: CapillaryBloodGlucoseType[] = [
  {
    value: 123,
    date_time_collect: formatTmz(createManausDate('2025-04-09 06:00:00.000')),
    user_id: 1,
    period: '06:00',
  },
  {
    value: 258,
    date_time_collect: formatTmz(createManausDate('2025-04-09 08:00:00.000')),
    user_id: 1,
    period: '08:00',
  },
  {
    value: 120,
    date_time_collect: formatTmz(createManausDate('2025-04-09 11:00:00.000')),
    user_id: 1,
    period: '11:00',
  },
  {
    value: 90,
    date_time_collect: formatTmz(createManausDate('2025-04-09 13:00:00.000')),
    user_id: 1,
    period: '13:00',
  },
  {
    value: 70,
    date_time_collect: formatTmz(createManausDate('2025-04-09 18:00:17.241')),
    user_id: 1,
    period: '18:00',
  },
  {
    value: 210,
    date_time_collect: formatTmz(createManausDate('2025-04-09 22:00:00.000')),
    user_id: 1,
    period: '22:00',
  },
  // Dia 2025-04-08
  {
    value: 172,
    date_time_collect: formatTmz(createManausDate('2025-04-08 06:00:00.000')),
    user_id: 1,
    period: '06:00',
  },
  {
    value: 198,
    date_time_collect: formatTmz(createManausDate('2025-04-08 08:00:00.000')),
    user_id: 1,
    period: '08:00',
  },
  {
    value: 245,
    date_time_collect: formatTmz(createManausDate('2025-04-08 11:00:00.000')),
    user_id: 1,
    period: '11:00',
  },
  {
    value: 163,
    date_time_collect: formatTmz(createManausDate('2025-04-08 13:00:00.000')),
    user_id: 1,
    period: '13:00',
  },
  {
    value: 134,
    date_time_collect: formatTmz(createManausDate('2025-04-08 18:00:17.241')),
    user_id: 1,
    period: '18:00',
  },
  {
    value: 210,
    date_time_collect: formatTmz(createManausDate('2025-04-08 22:00:00.000')),
    user_id: 1,
    period: '22:00',
  },
  // Dia 2025-04-07
  {
    value: 189,
    date_time_collect: formatTmz(createManausDate('2025-04-07 06:00:00.000')),
    user_id: 1,
    period: '06:00',
  },
  {
    value: 234,
    date_time_collect: formatTmz(createManausDate('2025-04-07 08:00:00.000')),
    user_id: 1,
    period: '08:00',
  },
  {
    value: 157,
    date_time_collect: formatTmz(createManausDate('2025-04-07 11:00:00.000')),
    user_id: 1,
    period: '11:00',
  },
  {
    value: 201,
    date_time_collect: formatTmz(createManausDate('2025-04-07 13:00:00.000')),
    user_id: 1,
    period: '13:00',
  },
  {
    value: 178,
    date_time_collect: formatTmz(createManausDate('2025-04-07 18:00:00.000')),
    user_id: 1,
    period: '18:00',
  },
  {
    value: 225,
    date_time_collect: formatTmz(createManausDate('2025-04-07 22:00:00.000')),
    user_id: 1,
    period: '22:00',
  },
  // Dia 2025-04-06
  {
    value: 165,
    date_time_collect: formatTmz(createManausDate('2025-04-06 06:00:00.000')),
    user_id: 1,
    period: '06:00',
  },
  {
    value: 192,
    date_time_collect: formatTmz(createManausDate('2025-04-06 08:00:00.000')),
    user_id: 1,
    period: '08:00',
  },
  {
    value: 248,
    date_time_collect: formatTmz(createManausDate('2025-04-06 11:00:00.000')),
    user_id: 1,
    period: '11:00',
  },
  {
    value: 180,
    date_time_collect: formatTmz(createManausDate('2025-04-06 13:00:00.000')),
    user_id: 1,
    period: '13:00',
  },
  {
    value: 213,
    date_time_collect: formatTmz(createManausDate('2025-04-06 18:00:00.000')),
    user_id: 1,
    period: '18:00',
  },
  {
    value: 159,
    date_time_collect: formatTmz(createManausDate('2025-04-06 22:00:00.000')),
    user_id: 1,
    period: '22:00',
  },
  // Dia 2025-04-05
  {
    value: 237,
    date_time_collect: formatTmz(createManausDate('2025-04-05 06:00:00.000')),
    user_id: 1,
    period: '06:00',
  },
  {
    value: 171,
    date_time_collect: formatTmz(createManausDate('2025-04-05 08:00:00.000')),
    user_id: 1,
    period: '08:00',
  },
  {
    value: 204,
    date_time_collect: formatTmz(createManausDate('2025-04-05 11:00:00.000')),
    user_id: 1,
    period: '11:00',
  },
  {
    value: 186,
    date_time_collect: formatTmz(createManausDate('2025-04-05 13:00:00.000')),
    user_id: 1,
    period: '13:00',
  },
  {
    value: 152,
    date_time_collect: formatTmz(createManausDate('2025-04-05 18:00:00.000')),
    user_id: 1,
    period: '18:00',
  },
  {
    value: 229,
    date_time_collect: formatTmz(createManausDate('2025-04-05 22:00:00.000')),
    user_id: 1,
    period: '22:00',
  },
  // Dia 2025-04-04
  {
    value: 196,
    date_time_collect: formatTmz(createManausDate('2025-04-04 06:00:00.000')),
    user_id: 1,
    period: '06:00',
  },
  {
    value: 241,
    date_time_collect: formatTmz(createManausDate('2025-04-04 08:00:00.000')),
    user_id: 1,
    period: '08:00',
  },
  {
    value: 168,
    date_time_collect: formatTmz(createManausDate('2025-04-04 11:00:00.000')),
    user_id: 1,
    period: '11:00',
  },
  {
    value: 219,
    date_time_collect: formatTmz(createManausDate('2025-04-04 13:00:00.000')),
    user_id: 1,
    period: '13:00',
  },
  {
    value: 187,
    date_time_collect: formatTmz(createManausDate('2025-04-04 18:00:00.000')),
    user_id: 1,
    period: '18:00',
  },
  {
    value: 250,
    date_time_collect: formatTmz(createManausDate('2025-04-04 22:00:00.000')),
    user_id: 1,
    period: '22:00',
  },
];
