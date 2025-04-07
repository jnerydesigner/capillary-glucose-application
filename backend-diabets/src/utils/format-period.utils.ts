import { formatInTimeZone, toZonedTime } from 'date-fns-tz';

interface TimePeriodHandler {
  setNext(handler: TimePeriodHandler): TimePeriodHandler;
  handle(date: string): string | null;
}

abstract class AbstractTimePeriodHandler implements TimePeriodHandler {
  private nextHandler: TimePeriodHandler | null = null;

  public setNext(handler: TimePeriodHandler): TimePeriodHandler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(dateStr: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(dateStr);
    }
    return null;
  }

  protected isWithin(
    dateStr: string,
    startHour: number,
    startMinute: number,
    endHour: number,
    endMinute: number,
  ): boolean {
    const date = toZonedTime(dateStr, 'America/Manaus');
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    const currentTimeInMinutes = hours * 60 + minutes;

    return (
      currentTimeInMinutes >= startTimeInMinutes &&
      currentTimeInMinutes <= endTimeInMinutes
    );
  }

  protected formatPeriod(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
  }
}

class CustomPeriodHandler extends AbstractTimePeriodHandler {
  constructor(
    private startHour: number,
    private startMinute: number,
    private endHour: number,
    private endMinute: number,
    private periodHour: number,
  ) {
    super();
  }

  public handle(dateStr: string): string | null {
    if (
      this.isWithin(
        dateStr,
        this.startHour,
        this.startMinute,
        this.endHour,
        this.endMinute,
      )
    ) {
      return this.formatPeriod(this.periodHour);
    }
    return super.handle(dateStr);
  }
}

export const getPeriod = (): string => {
  const dateTmz: Date = toZonedTime(new Date(), 'America/Manaus');

  const formattedDateTmz: string = formatInTimeZone(
    dateTmz,
    'America/Manaus',
    'yyyy-MM-dd HH:mm:ssXXX',
  );

  const handler1 = new CustomPeriodHandler(5, 0, 7, 59, 6); // 5:00 - 7:59
  const handler2 = new CustomPeriodHandler(8, 0, 10, 59, 8); // 8:00 - 10:59
  const handler3 = new CustomPeriodHandler(11, 0, 12, 59, 11); // 11:00 - 12:59
  const handler4 = new CustomPeriodHandler(13, 0, 15, 59, 13); // 13:00 - 15:59
  const handler5 = new CustomPeriodHandler(18, 0, 20, 59, 18); // 18:00 - 20:59
  const handler6 = new CustomPeriodHandler(22, 0, 23, 59, 22); // 22:00 - 23:59

  handler1
    .setNext(handler2)
    .setNext(handler3)
    .setNext(handler4)
    .setNext(handler5)
    .setNext(handler6);

  const period = handler1.handle(formattedDateTmz);

  if (!period) {
    throw new Error('Período não identificado para a hora fornecida.');
  }

  return period;
};
