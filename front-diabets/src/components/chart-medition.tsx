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
import { GlucoseRead } from "@/page/home";
import { mapToChartData } from "@/utils/mapped-rich-chart";

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

type ChartData = {
  data: string;
  "06:00": number | null;
  "08:00": number | null;
  "11:00": number | null;
  "13:00": number | null;
  "18:00": number | null;
  "22:00": number | null;
};

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

  const sortedChartData = [...chartDataProps].sort((a, b) => {
    const dateA = new Date(a.data.split("/").reverse().join("-"));
    const dateB = new Date(b.data.split("/").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
  });

  const limitedChartData = sortedChartData.slice(0, 7);

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

  const chartRowData: ChartData[] = mapToChartData(limitedChartData);

  const orderedChartRowData = [...chartRowData].sort((a, b) => {
    const dateA = new Date(a.data.split("/").reverse().join("-"));
    const dateB = new Date(b.data.split("/").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <Card className="w-full h-[400px] min-h-[500px]">
      <CardHeader>
        <CardTitle>Glicose Capilar por Dia</CardTitle>
        <CardDescription>Últimos 7 registros</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <BarChart width={1230} height={300} data={orderedChartRowData}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis
              dataKey="data"
              tickFormatter={(value) => {
                const [day, month] = value.split("/");
                return `${day}/${month}`; // Exibe DD/MM
              }}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              content={<ChartTooltipContent />}
            />
            {/* Linha de referência para a média geral */}
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
            <Bar
              dataKey="06:00"
              radius={4}
              fill={chartConfig["06:00"].color}
              fillOpacity={1}
            >
              <LabelList
                dataKey="06:00"
                position="center"
                className="font-bold"
                fill="#fff"
              />
              {orderedChartRowData.map((entry, index) => (
                <Cell
                  key={`cell-06:00-${index}`}
                  fill={getBarFillColor(
                    entry["06:00"],
                    chartConfig["06:00"].color
                  )}
                />
              ))}
            </Bar>
            <Bar
              dataKey="08:00"
              radius={4}
              fill={chartConfig["08:00"].color}
              fillOpacity={1}
            >
              <LabelList
                dataKey="08:00"
                position="center"
                className="font-bold"
                fill="#fff"
              />
              {orderedChartRowData.map((entry, index) => (
                <Cell
                  key={`cell-08:00-${index}`}
                  fill={getBarFillColor(
                    entry["08:00"],
                    chartConfig["08:00"].color
                  )}
                />
              ))}
            </Bar>
            <Bar
              dataKey="11:00"
              radius={4}
              fill={chartConfig["11:00"].color}
              fillOpacity={1}
            >
              <LabelList
                dataKey="11:00"
                position="center"
                className="font-bold"
                fill="#fff"
              />
              {orderedChartRowData.map((entry, index) => (
                <Cell
                  key={`cell-11:00-${index}`}
                  fill={getBarFillColor(
                    entry["11:00"],
                    chartConfig["11:00"].color
                  )}
                />
              ))}
            </Bar>
            <Bar
              dataKey="13:00"
              radius={4}
              fill={chartConfig["13:00"].color}
              fillOpacity={1}
            >
              <LabelList
                dataKey="13:00"
                position="center"
                className="font-bold"
                fill="#fff"
              />
              {orderedChartRowData.map((entry, index) => (
                <Cell
                  key={`cell-13:00-${index}`}
                  fill={getBarFillColor(
                    entry["13:00"],
                    chartConfig["13:00"].color
                  )}
                />
              ))}
            </Bar>
            <Bar
              dataKey="18:00"
              radius={4}
              fill={chartConfig["18:00"].color}
              fillOpacity={1}
            >
              <LabelList
                dataKey="18:00"
                position="center"
                className="font-bold"
                fill="#fff"
              />
              {orderedChartRowData.map((entry, index) => (
                <Cell
                  key={`cell-18:00-${index}`}
                  fill={getBarFillColor(
                    entry["18:00"],
                    chartConfig["18:00"].color
                  )}
                />
              ))}
            </Bar>
            <Bar
              dataKey="22:00"
              radius={4}
              fill={chartConfig["22:00"].color}
              fillOpacity={1}
            >
              <LabelList
                dataKey="22:00"
                position="center"
                className="font-bold"
                fill="#fff"
              />
              {orderedChartRowData.map((entry, index) => (
                <Cell
                  key={`cell-22:00-${index}`}
                  fill={getBarFillColor(
                    entry["22:00"],
                    chartConfig["22:00"].color
                  )}
                />
              ))}
            </Bar>
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
            .filter(([_, avg]) => avg > 0)
            .map(([slot, avg]) => `${slot}: ${avg} mg/dL`)
            .join(", ")}
        </div>
      </CardFooter>
    </Card>
  );
};
