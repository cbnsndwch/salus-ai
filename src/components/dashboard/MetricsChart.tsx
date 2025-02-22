
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

export const MetricsChart = ({ title, icon: Icon, data, metrics }: MetricsChartProps) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-card animate-fadeIn">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              className="text-sm"
              stroke="currentColor"
              tickLine={false}
            />
            <YAxis
              className="text-sm"
              stroke="currentColor"
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="font-medium">{label}</div>
                        {payload.map((p: any) => (
                          <div key={p.name} className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {p.name}
                            </span>
                            <span className="font-medium">
                              {p.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {metrics.map((metric) => (
              <Line
                key={metric.key}
                type="monotone"
                dataKey={metric.key}
                name={metric.name}
                stroke={metric.color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
