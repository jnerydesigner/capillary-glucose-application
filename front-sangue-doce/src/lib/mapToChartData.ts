import { GlucoseRead } from "@/components/chart-medition";

type TimeSlot = "06:00" | "08:00" | "11:00" | "13:00" | "18:00" | "22:00";

export type SimplifiedChartData = {
  data: string;
} & {
  [key in TimeSlot]: number | null;
};

export const mapToChartData = (input: GlucoseRead[]): SimplifiedChartData[] => {
  return input.map((item) => {
    const mapped: SimplifiedChartData = {
      data: item.data,
      "06:00": item["06:00"]?.value ?? null,
      "08:00": item["08:00"]?.value ?? null,
      "11:00": item["11:00"]?.value ?? null,
      "13:00": item["13:00"]?.value ?? null,
      "18:00": item["18:00"]?.value ?? null,
      "22:00": item["22:00"]?.value ?? null,
    };
    return mapped;
  });
};
