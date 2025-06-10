import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ChartContainer, ChartTooltipContent } from "./ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ReferenceLine,
  Cell,
} from "recharts";
import { mapToChartData, SimplifiedChartData } from "@/lib/mapToChartData";
import { subDays } from "date-fns";

const today = new Date();

const sevenDaysAgo = subDays(today, 6);
const parseDate = (str: string) => {
  const [day, month, year] = str.split("/").map(Number);
  return new Date(year, month - 1, day);
};

type ValueWithClass = {
  value: number | null;
  className: string;
};

export type GlucoseRead = {
  data: string;
} & {
  [key in TimeSlot]: ValueWithClass;
};

const chartConfig = {
  "06:00": {
    label: "06:00",
    color: "#6c95ec",
  },
  "08:00": {
    label: "08:00",
    color: "#1668cc",
  },
  "11:00": {
    label: "11:00",
    color: "#4025d6",
  },
  "13:00": {
    label: "13:00",
    color: "#1959e4",
  },
  "18:00": {
    label: "18:00",
    color: "#1e2bdd",
  },
  "22:00": {
    label: "22:00",
    color: "#0011fd",
  },
};

type TableProps = {
  chartData: GlucoseRead[];
};

type TimeSlot = "06:00" | "08:00" | "11:00" | "13:00" | "18:00" | "22:00";

export const GlucoseChart = ({ chartData: chartDataProps }: TableProps) => {
  if (!chartDataProps || chartDataProps.length === 0) {
    return (
      <Card className="w-full h-[400px] min-h-[400px]">
        <CardHeader>
          <CardTitle>Glicose Capilar por Dia</CardTitle>
          <CardDescription>Sem registros disponíveis</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const filteredData = chartDataProps.filter((item) => {
    const date = parseDate(item.data);
    return date >= sevenDaysAgo && date <= today;
  });

  const sortedChartData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.data.split("/").reverse().join("-"));
    const dateB = new Date(b.data.split("/").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
  });

  const uniqueDates = new Set<string>();
  const limitedChartData: GlucoseRead[] = [];

  for (const item of sortedChartData) {
    if (!uniqueDates.has(item.data)) {
      uniqueDates.add(item.data);
      limitedChartData.push(item);
    }

    if (uniqueDates.size === 7) break;
  }

  const calculateAverage = (data: GlucoseRead[]) => {
    const timeSlots: TimeSlot[] = [
      "06:00",
      "08:00",
      "11:00",
      "13:00",
      "18:00",
      "22:00",
    ];
    let totalSum = 0;
    let totalCount = 0;

    data.forEach((item) => {
      timeSlots.forEach((slot) => {
        const value = item[slot]?.value;
        if (value !== null && value !== undefined) {
          totalSum += value;
          totalCount += 1;
        }
      });
    });

    return totalCount > 0 ? Math.round(totalSum / totalCount) : 0;
  };

  const averageGlucose = calculateAverage(limitedChartData);

  const calculateAverageByTime = (data: GlucoseRead[]) => {
    const timeSlots: TimeSlot[] = [
      "06:00",
      "08:00",
      "11:00",
      "13:00",
      "18:00",
      "22:00",
    ];
    const averages: { [key in TimeSlot]?: number } = {};

    timeSlots.forEach((slot) => {
      let sum = 0;
      let count = 0;
      data.forEach((item) => {
        const value = item[slot]?.value;
        if (value !== null && value !== undefined) {
          sum += value;
          count += 1;
        }
      });
      averages[slot] = count > 0 ? Math.round(sum / count) : 0;
    });

    return averages;
  };

  const averagesByTime = calculateAverageByTime(limitedChartData);

  const getBarFillColor = (value: number | null, defaultColor: string) => {
    if (value !== null && value >= 180) {
      return "rgba(231, 76, 60, 1.0)";
    }
    return defaultColor;
  };

  const chartRowData: SimplifiedChartData[] = mapToChartData(limitedChartData);

  const orderedChartRowData = [...chartRowData].sort((a, b) => {
    const dateA = new Date(a.data.split("/").reverse().join("-"));
    const dateB = new Date(b.data.split("/").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <Card className="w-full h-[400px] min-h-[500px]">
      <CardHeader>
        <CardTitle>Glicose Capilar por Dia</CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          Média: {averageGlucose} mg/dL
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <BarChart width={1230} height={300} data={orderedChartRowData}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis
              dataKey="data"
              tickFormatter={(value) => {
                const [day, month] = value.split("/");
                return `${day}/${month}`;
              }}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              content={<ChartTooltipContent />}
            />
            {averageGlucose > 0 && (
              <ReferenceLine
                y={averageGlucose}
                stroke="red"
                strokeDasharray="3 3"
                label={{
                  value: `Média: ${averageGlucose} mg/dL`,
                  position: "insideTopRight",
                  fill: "red",
                  fontSize: 12,
                }}
              />
            )}
            {(Object.keys(chartConfig) as TimeSlot[]).map((slot) => (
              <Bar
                key={slot}
                dataKey={slot}
                radius={4}
                fill={chartConfig[slot].color}
                fillOpacity={1}
              >
                <LabelList
                  dataKey={slot}
                  position="center"
                  className="font-bold"
                  fill="#fff"
                />
                {orderedChartRowData.map((entry, index) => (
                  <Cell
                    key={`cell-${slot}-${index}`}
                    fill={getBarFillColor(entry[slot], chartConfig[slot].color)}
                  />
                ))}
              </Bar>
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Média semanal em alta <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {averageGlucose > 0
            ? `Média das últimas 7 leituras: ${averageGlucose} mg/dL`
            : "Nenhum dado disponível para calcular a média"}
        </div>
        <div className="leading-none text-muted-foreground">
          Médias por horário:{" "}
          {Object.entries(averagesByTime)
            .filter(([, avg]) => avg > 0)
            .map(([slot, avg]) => `${slot}: ${avg} mg/dL`)
            .join(", ")}
        </div>
      </CardFooter>
    </Card>
  );
};
