
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricsCardProps {
  title: string;
  icon: LucideIcon;
  metrics: Record<string, string>;
}

export const MetricsCard = ({ title, icon: Icon, metrics }: MetricsCardProps) => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-card animate-fadeIn">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="space-y-3">
        {Object.entries(metrics).map(([metric, value]) => (
          <div key={metric} className="flex justify-between items-center">
            <span className="text-gray-600 capitalize">
              {metric.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
