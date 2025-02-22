
import { LucideIcon, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  className?: string;
}

export const MetricsCard = ({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  trend, 
  trendValue,
  className 
}: MetricsCardProps) => {
  return (
    <Card className={cn(
      "p-6 text-white backdrop-blur-sm animate-fadeIn",
      className
    )}>
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
    </Card>
  );
};
