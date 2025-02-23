import { Moon, Timer, VolumeX, HeartPulse } from "lucide-react";
import { MetricsCard } from "./MetricsCard";
import { HealthMetric } from "@/types/health";

interface SleepMetricsSectionProps {
  data: HealthMetric[];
  formatMetricData: (key: string) => { date: string; value: number }[];
}

export const SleepMetricsSection = ({
  data,
  formatMetricData,
}: SleepMetricsSectionProps) => {
  const latestData = data[data.length - 1];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Sleep</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Sleep Score"
          value={latestData?.sleepScore.toString() ?? "0"}
          unit="/100"
          icon={Moon}
          trend="up"
          className="bg-gradient-to-br from-indigo-500/90 to-indigo-600/90"
          data={formatMetricData("sleepScore")}
        />
        <MetricsCard
          title="Sleep Duration"
          value={latestData?.sleepDuration.toString() ?? "0"}
          unit="hrs"
          icon={Timer}
          trend="stable"
          className="bg-gradient-to-br from-purple-500/90 to-purple-600/90"
          data={formatMetricData("sleepDuration")}
        />
        <MetricsCard
          title="Snore Count"
          value={latestData?.snoreCount.toString() ?? "0"}
          unit="events"
          icon={VolumeX}
          trend="down"
          className="bg-gradient-to-br from-slate-500/90 to-slate-600/90"
          data={formatMetricData("snoreCount")}
        />
        <MetricsCard
          title="Heart Rate Variability"
          value={latestData?.heartRateVariability.toString() ?? "0"}
          unit="ms"
          icon={HeartPulse}
          trend="up"
          className="bg-gradient-to-br from-pink-500/90 to-pink-600/90"
          data={formatMetricData("heartRateVariability")}
        />
      </div>
    </div>
  );
};
