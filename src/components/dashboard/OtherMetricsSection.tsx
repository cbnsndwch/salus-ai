import { useMemo } from 'react';
import { Activity, Scale, Zap } from 'lucide-react';

import { MetricsSectionProps } from '@/services/healthApi';

import { MetricsCard } from './MetricsCard';

export const OtherMetricsSection = ({
    formatMetricData,
}: MetricsSectionProps) => {
    const [glucoseData, weightData, painLevelData] = useMemo(
        () => [
            formatMetricData('glucose'),
            formatMetricData('weight'),
            formatMetricData('pain_level'),
        ],
        [formatMetricData]
    );

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Other Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricsCard
                    title="Glucose"
                    value={glucoseData?.at(-1).value.toString() ?? '0'}
                    unit="mg/dL"
                    icon={Activity}
                    trend="stable"
                    className="bg-gradient-to-br from-rose-500/90 to-rose-600/90"
                    data={glucoseData}
                />
                <MetricsCard
                    title="Weight"
                    value={weightData?.at(-1).value.toString() ?? '0'}
                    unit="kg"
                    icon={Scale}
                    trend="down"
                    className="bg-gradient-to-br from-cyan-500/90 to-cyan-600/90"
                    data={weightData}
                />
                <MetricsCard
                    title="Pain Level"
                    value={painLevelData?.at(-1).value.toString() ?? '0'}
                    unit="/10"
                    icon={Zap}
                    trend="down"
                    className="bg-gradient-to-br from-amber-500/90 to-amber-600/90"
                    data={painLevelData}
                />
            </div>
        </div>
    );
};
