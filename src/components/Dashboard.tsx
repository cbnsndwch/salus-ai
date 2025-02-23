/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity, Bell, Heart, Plus, User } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import { fetchHealthMetrics } from '@/services/mockHealthData';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

import { AppointmentCard } from './dashboard/AppointmentCard';
import { MedicationCard } from './dashboard/MedicationCard';
import { MetricsCard } from './dashboard/MetricsCard';
import { MetricsChart } from './dashboard/MetricsChart';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

function Dashboard() {
    const { toast } = useToast();
    const [timeRange, setTimeRange] = useState('7d');

    // Fetch time series data
    const { data: timeSeriesData = [] } = useQuery({
        queryKey: ['healthMetrics', timeRange],
        queryFn: () =>
            fetchHealthMetrics(
                timeRange === '30d' ? 30 : timeRange === '14d' ? 14 : 7
            ),
    });

    // Automatically collected metrics
    const [autoMetrics] = useState({
        heartRate: '72 bpm',
        spo2: '98%',
        bloodPressure: '120/80',
        sleepScore: '85/100',
        sleepDuration: '7.5 hrs',
        snoreCount: '12 events',
        heartRateVariability: '45 ms',
        glucose: '95 mg/dL',
    });

    // Self-reported metrics
    const [selfReportedMetrics] = useState({
        bodyTemperature: '98.6°F',
        painLevel: '2/10',
        weight: '70 kg',
    });

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

    const [insights] = useState([
        {
            type: 'alert',
            message: 'Blood pressure trending higher this week',
            action: 'Schedule a check-up',
            severity: 'warning',
        },
        {
            type: 'tip',
            message: 'Walking 30 minutes daily can help manage blood pressure',
            action: 'Learn more',
            severity: 'info',
        },
    ]);

    const handleInsightAction = useCallback(
        (insight: (typeof insights)[0]) => {
            toast({
                title: insight.type === 'alert' ? 'Health Alert' : 'Health Tip',
                description: insight.message,
                duration: 5000,
            });
        },
        [toast]
    );

    // Format data for metric cards
    const formatMetricData = (key: string) => {
        return timeSeriesData.map((item: any) => ({
            date: item.date,
            value: item[key],
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Section with Time Range Selector */}
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="text-gray-500 mb-1">Good Morning</p>
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                Hello there!
                                <span role="img" aria-label="wave">
                                    👋
                                </span>
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Select
                            defaultValue="7d"
                            onValueChange={(value) => setTimeRange(value)}
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7d">Last 7 days</SelectItem>
                                <SelectItem value="14d">
                                    Last 14 days
                                </SelectItem>
                                <SelectItem value="30d">
                                    Last 30 days
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Plus className="h-5 w-5" />
                        </Button>
                        {/* <Avatar className="h-10 w-10">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar> */}
                    </div>
                </header>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricsCard
                        title="Heart Rate"
                        value="72"
                        unit="bpm"
                        icon={Heart}
                        trend="up"
                        trendValue="2.5%"
                        className="bg-gradient-to-br from-violet-500/90 to-violet-600/90"
                        data={formatMetricData('heartRate')}
                    />
                    <MetricsCard
                        title="Blood Pressure"
                        value="120/80"
                        unit="mmHg"
                        icon={Activity}
                        trend="stable"
                        className="bg-gradient-to-br from-emerald-500/90 to-emerald-600/90"
                        data={formatMetricData('bloodPressureSystolic')}
                    />
                    <MetricsCard
                        title="Glucose"
                        value="95"
                        unit="mg/dL"
                        icon={Activity}
                        trend="down"
                        trendValue="1.2%"
                        className="bg-gradient-to-br from-rose-500/90 to-rose-600/90"
                        data={formatMetricData('glucose')}
                    />
                    <MetricsCard
                        title="SPO2"
                        value="98"
                        unit="%"
                        icon={Activity}
                        trend="stable"
                        className="bg-gradient-to-br from-blue-500/90 to-blue-600/90"
                        data={formatMetricData('spo2')}
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <MetricsChart
                        title="Cardiovascular Metrics"
                        icon={Heart}
                        data={timeSeriesData}
                        metrics={[
                            {
                                key: 'heartRate',
                                name: 'Heart Rate',
                                color: '#4ade80',
                            },
                            {
                                key: 'bloodPressureSystolic',
                                name: 'Systolic BP',
                                color: '#f43f5e',
                            },
                            {
                                key: 'bloodPressureDiastolic',
                                name: 'Diastolic BP',
                                color: '#ec4899',
                            },
                        ]}
                    />
                    <MetricsChart
                        title="Other Metrics"
                        icon={Activity}
                        data={timeSeriesData}
                        metrics={[
                            {
                                key: 'glucose',
                                name: 'Glucose',
                                color: '#8b5cf6',
                            },
                            { key: 'spo2', name: 'SPO2', color: '#3b82f6' },
                            { key: 'weight', name: 'Weight', color: '#14b8a6' },
                        ]}
                    />
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <MedicationCard medications={medications} />
                    <AppointmentCard appointments={appointments} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
