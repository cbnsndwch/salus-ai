import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface MetricsChartProps {
  title: string;
  icon: LucideIcon;
  data: any[];
  metrics: {
    key: string;
    name: string;
    color: string;
  }[];
}

export const MetricsChart = ({
  title,
  icon: Icon,
  data,
  metrics,
}: MetricsChartProps) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-card/50 animate-fadeIn">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="h-[300px] mt-4 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              {metrics.map((metric) => (
                <linearGradient
                  key={metric.key}
                  id={`gradient-${metric.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={metric.color}
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="100%"
                    stopColor={metric.color}
                    stopOpacity={0.05}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-muted/20"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              className="text-xs font-medium"
              stroke="currentColor"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              className="text-xs font-medium"
              stroke="currentColor"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background/95 p-4 shadow-lg backdrop-blur-sm">
                      <div className="flex flex-col gap-2">
                        <div className="font-medium text-sm">
                          {new Date(label).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="grid gap-2">
                          {payload.map((p: any) => (
                            <div
                              key={p.name}
                              className="flex items-center justify-between gap-2"
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: p.color }}
                                />
                                <span className="text-sm font-medium text-muted-foreground">
                                  {p.name}
                                </span>
                              </div>
                              <span className="font-medium">{p.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {metrics.map((metric) => (
              <Area
                key={metric.key}
                type="monotone"
                dataKey={metric.key}
                name={metric.name}
                stroke={metric.color}
                fill={`url(#gradient-${metric.key})`}
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  strokeWidth: 2,
                  stroke: metric.color,
                  fill: "white",
                }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
