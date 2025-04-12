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
  ResponsiveContainer,
  Tooltip,
  LabelList,
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

export const GlucoseChart = ({ chartData: chartDataProps }: TableProps) => {
  console.log("Vindo do chart", chartDataProps);
  const chartRowData = mapToChartData(chartDataProps);

  console.log(chartRowData);
  return (
    <Card className="w-full h-[400px] min-h-[400px]">
      <CardHeader>
        <CardTitle>Glicose Capilar por Dia</CardTitle>
        <CardDescription>Últimos registros</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartRowData}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="data" />
              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="06:00" fill={chartConfig["06:00"].color} radius={4}>
                <LabelList
                  dataKey="06:00"
                  position="center"
                  className="font-bold"
                  fill="#fff"
                />
              </Bar>
              <Bar dataKey="08:00" fill={chartConfig["08:00"].color} radius={4}>
                <LabelList
                  dataKey="08:00"
                  position="center"
                  className="font-bold"
                  fill="#fff"
                />
              </Bar>
              <Bar dataKey="11:00" fill={chartConfig["11:00"].color} radius={4}>
                <LabelList
                  dataKey="11:00"
                  position="center"
                  className="font-bold"
                  fill="#fff"
                />
              </Bar>
              <Bar dataKey="13:00" fill={chartConfig["13:00"].color} radius={4}>
                <LabelList
                  dataKey="13:00"
                  position="center"
                  className="font-bold"
                  fill="#fff"
                />
              </Bar>
              <Bar dataKey="18:00" fill={chartConfig["18:00"].color} radius={4}>
                <LabelList
                  dataKey="18:00"
                  position="center"
                  className="font-bold"
                  fill="#fff"
                />
              </Bar>
              <Bar dataKey="22:00" fill={chartConfig["22:00"].color} radius={4}>
                <LabelList
                  dataKey="22:00"
                  position="center"
                  className="font-bold"
                  fill="#fff"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Média semanal em alta <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Comparando horários de medição (06:00 vs 08:00)
        </div>
      </CardFooter>
    </Card>
  );
};
