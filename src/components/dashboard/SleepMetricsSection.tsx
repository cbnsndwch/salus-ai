import { useMemo } from 'react';
import { Moon, Timer, VolumeX, HeartPulse } from 'lucide-react';

import { MetricsSectionProps } from '@/services/healthApi';

import { MetricsCard } from './MetricsCard';

export function SleepMetricsSection({ formatMetricData }: MetricsSectionProps) {
    const [sleepScore, sleepDuration, snoreCount, heartRateVariability] =
        useMemo(
            () => [
                formatMetricData('sleep_score'),
                formatMetricData('sleep_duration'),
                formatMetricData('snore_count'),
                formatMetricData('heart_rate_variability'),
            ],
            [formatMetricData]
        );

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Sleep</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricsCard
                    title="Sleep Score"
                    value={sleepScore?.at(-1)?.value.toString() ?? '0'}
                    unit="/100"
                    icon={Moon}
                    trend="up"
                    className="bg-gradient-to-br from-indigo-500/90 to-indigo-600/90"
                    data={sleepScore}
                />
                <MetricsCard
                    title="Sleep Duration"
                    value={sleepDuration?.at(-1)?.value.toString() ?? '0'}
                    unit="hrs"
                    icon={Timer}
                    trend="stable"
                    className="bg-gradient-to-br from-purple-500/90 to-purple-600/90"
                    data={sleepDuration}
                />
                <MetricsCard
                    title="Snore Count"
                    value={snoreCount?.at(-1)?.value.toString() ?? '0'}
                    unit="events"
                    icon={VolumeX}
                    trend="down"
                    className="bg-gradient-to-br from-slate-500/90 to-slate-600/90"
                    data={snoreCount}
                />
                <MetricsCard
                    title="Heart Rate Variability"
                    value={heartRateVariability?.at(-1)?.toString() ?? '0'}
                    unit="ms"
                    icon={HeartPulse}
                    trend="up"
                    className="bg-gradient-to-br from-pink-500/90 to-pink-600/90"
                    data={heartRateVariability}
                />
            </div>
        </div>
    );
}
