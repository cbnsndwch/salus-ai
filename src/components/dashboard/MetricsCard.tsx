import { LucideIcon, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

interface MetricsCardProps {
  title: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  className?: string;
  data?: { value: number; date: string }[];
}

export const MetricsCard = ({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  trendValue,
  className,
  data = [],
}: MetricsCardProps) => {
  return (
    <Card
      className={cn(
        "p-6 text-white backdrop-blur-sm animate-fadeIn relative overflow-hidden",
        className,
      )}
    >
      {/* Mini Chart Background */}
      <div className="absolute inset-0 opacity-30">
        {data.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="cardGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="white" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="white"
                strokeWidth={2}
                fill="url(#cardGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <Icon className="w-5 h-5" />
          {trend && (
            <div className="flex items-center gap-1 text-sm">
              {trend === "up" && <TrendingUp className="w-4 h-4" />}
              {trend === "down" && <TrendingDown className="w-4 h-4" />}
              {trend === "stable" && <Minus className="w-4 h-4" />}
              {trendValue && <span>{trendValue}</span>}
            </div>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium opacity-90">{title}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{value}</span>
            <span className="text-sm opacity-90">{unit}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
