import { addDays } from 'date-fns';

export const getAddOfDayInTimezone = (utcDateString: string): Date => {
  const utcDate = new Date(utcDateString);

  if (isNaN(utcDate.getTime())) {
    throw new Error(
      'Invalid date string. Expected format: YYYY-MM-DDTHH:mm:ss.SSSZ',
    );
  }

  const nextDay = addDays(utcDate, 1);
  return nextDay;
};
