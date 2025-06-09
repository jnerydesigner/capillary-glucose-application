type RichDataPoint = {
  data: string;
  [time: string]: any;
};

interface ChartDataPoint {
  data: string;
  [key: string]: number | string | null;
}

export const mapToChartData = (input: RichDataPoint[]): ChartDataPoint[] => {
  return input.map((item) => {
    const mapped: ChartDataPoint = {
      data: item.data.slice(0, 5),
    };

    Object.entries(item).forEach(([key, value]) => {
      if (key !== "data") {
        mapped[key] = value?.value ?? 0;
      }
    });

    return mapped;
  });
};
