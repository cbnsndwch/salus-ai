
import { Activity, Heart, Gauge, Thermometer } from "lucide-react";
import { MetricsCard } from "./MetricsCard";
import { HealthMetric } from "@/types/health";

interface VitalSignsSectionProps {
  data: HealthMetric[];
  formatMetricData: (key: string) => { date: string; value: number }[];
}

export const VitalSignsSection = ({ data, formatMetricData }: VitalSignsSectionProps) => {
  const latestData = data[data.length - 1];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Vital Signs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Heart Rate"
          value={latestData?.heartRate.toString() ?? "0"}
          unit="bpm"
          icon={Heart}
          trend="stable"
          className="bg-gradient-to-br from-violet-500/90 to-violet-600/90"
          data={formatMetricData('heartRate')}
        />
        <MetricsCard
          title="Blood Pressure"
          value={`${latestData?.bloodPressureSystolic ?? 0}/${latestData?.bloodPressureDiastolic ?? 0}`}
          unit="mmHg"
          icon={Activity}
          trend="stable"
          className="bg-gradient-to-br from-emerald-500/90 to-emerald-600/90"
          data={formatMetricData('bloodPressureSystolic')}
        />
        <MetricsCard
          title="SPO2"
          value={latestData?.spo2.toString() ?? "0"}
          unit="%"
          icon={Gauge}
          trend="stable"
          className="bg-gradient-to-br from-blue-500/90 to-blue-600/90"
          data={formatMetricData('spo2')}
        />
        <MetricsCard
          title="Body Temperature"
          value={latestData?.bodyTemperature.toFixed(1) ?? "0"}
          unit="°F"
          icon={Thermometer}
          trend="stable"
          className="bg-gradient-to-br from-orange-500/90 to-orange-600/90"
          data={formatMetricData('bodyTemperature')}
        />
      </div>
    </div>
  );
};
