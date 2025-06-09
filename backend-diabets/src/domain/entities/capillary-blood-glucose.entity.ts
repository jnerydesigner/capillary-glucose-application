import { formatTmz } from '@app/infra/utils/format-date-time.utils';
import { getPeriod } from '@app/infra/utils/format-period.utils';

export interface CapillaryBloodGlucoseProps {
  id?: number;
  value: number;
  userId: number;
  dateTimeCollect: Date;
  period: string;
}

export class CapillaryBloodGlucoseEntity {
  private constructor(private props: CapillaryBloodGlucoseProps) {}

  get id(): number | undefined {
    return this.props.id;
  }

  get value(): number {
    return this.props.value;
  }

  get userId(): number {
    return this.props.userId;
  }

  get dateTimeCollect(): Date {
    return this.props.dateTimeCollect;
  }

  get period(): string {
    return this.props.period;
  }

  updateValue(newValue: number) {
    this.props.value = newValue;
  }

  isHigh(threshold = 180): boolean {
    return this.props.value > threshold;
  }

  isLow(threshold = 70): boolean {
    return this.props.value < threshold;
  }

  toPrimitives() {
    return {
      value: this.props.value,
      userId: this.props.userId,
      date_time_collect: formatTmz(this.props.dateTimeCollect),
      period: this.props.period,
    };
  }

  static create(input: {
    value: number;
    userId: number;
    dateTimeCollect?: Date;
  }): CapillaryBloodGlucoseEntity {
    const date = input.dateTimeCollect ?? new Date();
    const period = getPeriod();
    return new CapillaryBloodGlucoseEntity({
      value: input.value,
      userId: input.userId,
      dateTimeCollect: date,
      period,
    });
  }
}
