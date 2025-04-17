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

export const FormatDateBR = (data: string) => {
  const dataSplit = data.split('-');
  const year = dataSplit[0];
  const month = dataSplit[1];
  const day = dataSplit[2];

  return `${day}/${month}/${year}`;
};

export const DatePeriodFormated = (dateInitial: string, dateFinal: string) => {
  const dateInitialSplit = dateInitial.split('T')[0].split('-');
  const dateFinalSplit = dateFinal.split('T')[0].split('-');

  const yearInitial = dateInitialSplit[0];
  const monthInitial = dateInitialSplit[1];
  const dayInitial = dateInitialSplit[2];

  const yearFinal = dateFinalSplit[0];
  const monthFinal = dateFinalSplit[1];
  const dayFinal = dateFinalSplit[2];

  return `${dayInitial}/${monthInitial}/${yearInitial} até ${dayFinal}/${monthFinal}/${yearFinal}`;
};

// 2025-03-25T00:00:00.000Z 2025-04-17T23:59:59.999Z
