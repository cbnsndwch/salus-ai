import { useMemo } from 'react';
import { Activity, Heart, Gauge, Thermometer } from 'lucide-react';

import { MetricsSectionProps } from '@/services/healthApi';

import { MetricsCard } from './MetricsCard';

export function VitalSignsSection({ formatMetricData }: MetricsSectionProps) {
    const heartRateData = useMemo(
        () => formatMetricData('heartrate'),
        [formatMetricData]
    );

    const [systolicData, diastolicData] = useMemo(
        () => [
            formatMetricData('blood_pressure_systolic'),
            formatMetricData('blood_pressure_diastolic'),
        ],
        [formatMetricData]
    );

    const spo2Data = useMemo(
        () => formatMetricData('SPO2'),
        [formatMetricData]
    );

    const temperatureData = useMemo(
        () => formatMetricData('body_temperature'),
        [formatMetricData]
    );

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Vitals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricsCard
                    title="Heart Rate"
                    value={heartRateData?.at(-1)?.value.toString() ?? '0'}
                    unit="bpm"
                    icon={Heart}
                    trend="stable"
                    className="bg-gradient-to-br from-violet-500/90 to-violet-600/90"
                    data={heartRateData}
                />

                <MetricsCard
                    title="Blood Pressure"
                    value={`${systolicData?.at(-1)?.value ?? 0}/${diastolicData?.at(-1)?.value ?? 0}`}
                    unit="mmHg"
                    icon={Activity}
                    trend="stable"
                    className="bg-gradient-to-br from-emerald-500/90 to-emerald-600/90"
                    data={systolicData}
                />

                <MetricsCard
                    title="SPO2"
                    value={spo2Data?.at(-1)?.value.toString() ?? '0'}
                    unit="%"
                    icon={Gauge}
                    trend="stable"
                    className="bg-gradient-to-br from-blue-500/90 to-blue-600/90"
                    data={spo2Data}
                />

                <MetricsCard
                    title="Body Temperature"
                    value={temperatureData?.at(-1)?.value.toFixed(1) ?? '0'}
                    unit="°F"
                    icon={Thermometer}
                    trend="stable"
                    className="bg-gradient-to-br from-orange-500/90 to-orange-600/90"
                    data={temperatureData}
                />
            </div>
        </div>
    );
}
