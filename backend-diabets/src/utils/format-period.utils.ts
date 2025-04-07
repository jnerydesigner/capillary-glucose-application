interface TimePeriodHandler {
  setNext(handler: TimePeriodHandler): TimePeriodHandler;
  handle(date: Date): string | null;
}

abstract class AbstractTimePeriodHandler implements TimePeriodHandler {
  private nextHandler: TimePeriodHandler | null = null;

  public setNext(handler: TimePeriodHandler): TimePeriodHandler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(date: Date): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(date);
    }
    return null;
  }

  protected isWithin(date: Date, startHour: number, endHour: number): boolean {
    const hour = date.getUTCHours();
    return hour >= startHour && hour <= endHour;
  }

  protected formatPeriod(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`;
  }
}

class CustomPeriodHandler extends AbstractTimePeriodHandler {
  constructor(
    private startHour: number,
    private endHour: number,
    private periodHour: number,
  ) {
    super();
  }

  public handle(date: Date): string | null {
    if (this.isWithin(date, this.startHour, this.endHour)) {
      return this.formatPeriod(this.periodHour);
    }
    return super.handle(date);
  }
}

export const getPeriod = (dateStr: string): string => {
  const date = new Date(dateStr);

  const handler1 = new CustomPeriodHandler(5, 7, 6);
  const handler2 = new CustomPeriodHandler(8, 11, 8);
  const handler3 = new CustomPeriodHandler(11, 12, 11);
  const handler4 = new CustomPeriodHandler(13, 17, 13);
  const handler5 = new CustomPeriodHandler(17, 19, 18);
  const handler6 = new CustomPeriodHandler(19, 23, 22);

  handler1
    .setNext(handler2)
    .setNext(handler3)
    .setNext(handler4)
    .setNext(handler5)
    .setNext(handler6);

  const period = handler1.handle(date);

  if (!period) {
    throw new Error('Período não identificado para a hora fornecida.');
  }

  return period;
};
