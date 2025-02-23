import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { fetchHealthReadings, addHealthReading } from '@/services/healthApi';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

import { DashboardHeader } from './dashboard/DashboardHeader';
import { VitalSignsSection } from './dashboard/VitalSignsSection';
import { SleepMetricsSection } from './dashboard/SleepMetricsSection';
import { OtherMetricsSection } from './dashboard/OtherMetricsSection';
import { MedicationCard } from './dashboard/MedicationCard';
import { AppointmentCard } from './dashboard/AppointmentCard';

import ConversationWidget from './ConversationWidget';

const MOCK_USER_ID = 'USER_3'; // We can make this dynamic later

export default function Dashboard() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [timeRange, setTimeRange] = useState('7d');

    // Fetch health data from the API
    const {
        data: healthData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['healthData', MOCK_USER_ID],
        queryFn: () => fetchHealthReadings(MOCK_USER_ID),
    });

    // Mutation for adding new readings
    const addReadingMutation = useMutation({
        mutationFn: ({
            readingName,
            value,
            unit,
        }: {
            readingName: string;
            value: number;
            unit: string;
        }) => addHealthReading(MOCK_USER_ID, readingName, value, unit),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['healthData'] });
            toast({
                title: 'Reading added successfully',
                description: 'Your health data has been updated.',
            });
        },
        onError: (error) => {
            toast({
                title: 'Error adding reading',
                description: 'Please try again later.',
                variant: 'destructive',
            });
        },
    });

    // Format data for metric cards
    function formatMetricData(key: string) {
        return healthData?.readings
            ?.filter((item) => item.readingName === key)
            ?.map((item) => ({
                // date: new Date(item.readingTS),
                date: item.readingTS,
                value: item.readingValue,
            }));
    }

    // Mock data for medications and appointments (kept as is for now)
    const [medications] = useState([
        {
            name: 'Lisinopril',
            time: '8:00 AM',
            taken: false,
            instructions: 'Take with food',
            nextRefill: 'March 25, 2024',
        },
        {
            name: 'Metformin',
            time: '2:00 PM',
            taken: false,
            instructions: 'Take with meals',
            nextRefill: 'March 30, 2024',
        },
    ]);

    const [appointments] = useState([
        {
            doctor: 'Dr. Smith',
            specialty: 'Cardiologist',
            date: 'March 15, 2024',
            notes: 'Regular checkup + ECG',
            priority: 'high',
        },
        {
            doctor: 'Dr. Johnson',
            specialty: 'Endocrinologist',
            date: 'March 20, 2024',
            notes: 'Diabetes management review',
            priority: 'medium',
        },
    ]);

    if (isLoading || error) {
        return (
            <div
                className={cn(
                    'flex items-center justify-center min-h-screen',
                    error ? 'text-red-500' : ''
                )}
            >
                {isLoading
                    ? 'Loading...'
                    : 'Error loading health data. Please try again later.'}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <DashboardHeader
                    timeRange={timeRange}
                    onTimeRangeChange={setTimeRange}
                />

                <VitalSignsSection
                    data={healthData}
                    formatMetricData={formatMetricData}
                />

                {/* <SleepMetricsSection
                    data={healthData}
                    formatMetricData={formatMetricData}
                />

                <OtherMetricsSection
                    data={healthData}
                    formatMetricData={formatMetricData}
                />  */}

                <ConversationWidget />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <MedicationCard medications={medications} />
                    <AppointmentCard appointments={appointments} />
                </div>
            </div>
        </div>
    );
}
