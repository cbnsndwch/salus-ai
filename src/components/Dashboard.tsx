import { useState, useCallback } from "react";
import { 
  Activity, 
  Bell, 
  Heart, 
  Plus, 
  Moon, 
  Thermometer, 
  Scale, 
  Zap,
  HeartPulse,
  Timer,
  VolumeX,
  Gauge
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { MetricsCard } from "./dashboard/MetricsCard";
import { MedicationCard } from "./dashboard/MedicationCard";
import { AppointmentCard } from "./dashboard/AppointmentCard";
import { MetricsChart } from "./dashboard/MetricsChart";
import { fetchHealthMetrics } from "@/services/mockHealthData";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const Dashboard = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState("7d");
  
  // Fetch time series data
  const { data: timeSeriesData = [] } = useQuery({
    queryKey: ['healthMetrics', timeRange],
    queryFn: () => fetchHealthMetrics(timeRange === "30d" ? 30 : timeRange === "14d" ? 14 : 7),
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
      value: item[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-gray-500 mb-1">Good Morning</p>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                Hello there!
                <span role="img" aria-label="wave">👋</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="7d" onValueChange={(value) => setTimeRange(value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="14d">Last 14 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
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

        {/* Vital Signs */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Vital Signs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Heart Rate"
              value={timeSeriesData[timeSeriesData.length - 1]?.heartRate.toString() ?? "0"}
              unit="bpm"
              icon={Heart}
              trend="stable"
              className="bg-gradient-to-br from-violet-500/90 to-violet-600/90"
              data={formatMetricData('heartRate')}
            />
            <MetricsCard
              title="Blood Pressure"
              value={`${timeSeriesData[timeSeriesData.length - 1]?.bloodPressureSystolic ?? 0}/${timeSeriesData[timeSeriesData.length - 1]?.bloodPressureDiastolic ?? 0}`}
              unit="mmHg"
              icon={Activity}
              trend="stable"
              className="bg-gradient-to-br from-emerald-500/90 to-emerald-600/90"
              data={formatMetricData('bloodPressureSystolic')}
            />
            <MetricsCard
              title="SPO2"
              value={timeSeriesData[timeSeriesData.length - 1]?.spo2.toString() ?? "0"}
              unit="%"
              icon={Gauge}
              trend="stable"
              className="bg-gradient-to-br from-blue-500/90 to-blue-600/90"
              data={formatMetricData('spo2')}
            />
            <MetricsCard
              title="Body Temperature"
              value={timeSeriesData[timeSeriesData.length - 1]?.bodyTemperature.toFixed(1) ?? "0"}
              unit="°F"
              icon={Thermometer}
              trend="stable"
              className="bg-gradient-to-br from-orange-500/90 to-orange-600/90"
              data={formatMetricData('bodyTemperature')}
            />
          </div>
        </div>

        {/* Sleep Metrics */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Sleep</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Sleep Score"
              value={timeSeriesData[timeSeriesData.length - 1]?.sleepScore.toString() ?? "0"}
              unit="/100"
              icon={Moon}
              trend="up"
              className="bg-gradient-to-br from-indigo-500/90 to-indigo-600/90"
              data={formatMetricData('sleepScore')}
            />
            <MetricsCard
              title="Sleep Duration"
              value={timeSeriesData[timeSeriesData.length - 1]?.sleepDuration.toString() ?? "0"}
              unit="hrs"
              icon={Timer}
              trend="stable"
              className="bg-gradient-to-br from-purple-500/90 to-purple-600/90"
              data={formatMetricData('sleepDuration')}
            />
            <MetricsCard
              title="Snore Count"
              value={timeSeriesData[timeSeriesData.length - 1]?.snoreCount.toString() ?? "0"}
              unit="events"
              icon={VolumeX}
              trend="down"
              className="bg-gradient-to-br from-slate-500/90 to-slate-600/90"
              data={formatMetricData('snoreCount')}
            />
            <MetricsCard
              title="Heart Rate Variability"
              value={timeSeriesData[timeSeriesData.length - 1]?.heartRateVariability.toString() ?? "0"}
              unit="ms"
              icon={HeartPulse}
              trend="up"
              className="bg-gradient-to-br from-pink-500/90 to-pink-600/90"
              data={formatMetricData('heartRateVariability')}
            />
          </div>
        </div>

        {/* Other Metrics */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Other Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricsCard
              title="Glucose"
              value={timeSeriesData[timeSeriesData.length - 1]?.glucose.toString() ?? "0"}
              unit="mg/dL"
              icon={Activity}
              trend="stable"
              className="bg-gradient-to-br from-rose-500/90 to-rose-600/90"
              data={formatMetricData('glucose')}
            />
            <MetricsCard
              title="Weight"
              value={timeSeriesData[timeSeriesData.length - 1]?.weight.toString() ?? "0"}
              unit="kg"
              icon={Scale}
              trend="down"
              className="bg-gradient-to-br from-cyan-500/90 to-cyan-600/90"
              data={formatMetricData('weight')}
            />
            <MetricsCard
              title="Pain Level"
              value={timeSeriesData[timeSeriesData.length - 1]?.painLevel.toString() ?? "0"}
              unit="/10"
              icon={Zap}
              trend="down"
              className="bg-gradient-to-br from-amber-500/90 to-amber-600/90"
              data={formatMetricData('painLevel')}
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <MetricsChart
            title="Cardiovascular Metrics"
            icon={Heart}
            data={timeSeriesData}
            metrics={[
              { key: 'heartRate', name: 'Heart Rate', color: '#4ade80' },
              { key: 'bloodPressureSystolic', name: 'Systolic BP', color: '#f43f5e' },
              { key: 'bloodPressureDiastolic', name: 'Diastolic BP', color: '#ec4899' },
            ]}
          />
          <MetricsChart
            title="Sleep Metrics"
            icon={Moon}
            data={timeSeriesData}
            metrics={[
              { key: 'sleepScore', name: 'Sleep Score', color: '#8b5cf6' },
              { key: 'sleepDuration', name: 'Sleep Duration', color: '#3b82f6' },
              { key: 'snoreCount', name: 'Snore Count', color: '#14b8a6' },
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
};

export default Dashboard;
