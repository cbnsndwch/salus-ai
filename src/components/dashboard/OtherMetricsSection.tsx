
import { Activity, Scale, Zap } from "lucide-react";
import { MetricsCard } from "./MetricsCard";
import { HealthMetric } from "@/types/health";

interface OtherMetricsSectionProps {
  data: HealthMetric[];
  formatMetricData: (key: string) => { date: string; value: number }[];
}

export const OtherMetricsSection = ({ data, formatMetricData }: OtherMetricsSectionProps) => {
  const latestData = data[data.length - 1];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Other Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Glucose"
          value={latestData?.glucose.toString() ?? "0"}
          unit="mg/dL"
          icon={Activity}
          trend="stable"
          className="bg-gradient-to-br from-rose-500/90 to-rose-600/90"
          data={formatMetricData('glucose')}
        />
        <MetricsCard
          title="Weight"
          value={latestData?.weight.toString() ?? "0"}
          unit="kg"
          icon={Scale}
          trend="down"
          className="bg-gradient-to-br from-cyan-500/90 to-cyan-600/90"
          data={formatMetricData('weight')}
        />
        <MetricsCard
          title="Pain Level"
          value={latestData?.painLevel.toString() ?? "0"}
          unit="/10"
          icon={Zap}
          trend="down"
          className="bg-gradient-to-br from-amber-500/90 to-amber-600/90"
          data={formatMetricData('painLevel')}
        />
      </div>
    </div>
  );
};
