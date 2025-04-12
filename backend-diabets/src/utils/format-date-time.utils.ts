import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const formatDateTime = (dateTime: Date) => {
  const date = new Date(dateTime);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export const formatTmz = (data: Date) => {
  const tz = toZonedTime(data, 'America/Manaus');
  const formattedDate = format(tz, 'yyyy-MM-dd HH:mm:ss.SSS');
  console.log(formattedDate);
  return formattedDate;
};

// export const formatTmzString = (data: string) => {
//   const date = new Date(data);
//   const tz = toZonedTime(date, 'America/Manaus');
//   const formattedDate = format(tz, 'yyyy-MM-dd HH:mm:ss.SSS');
//   console.log(formattedDate);
//   return formattedDate;
// };

export const formatTmzString = (data: string) => {
  const date = new Date(data);
  return toZonedTime(date, 'America/Manaus');
};
