
import { useState } from "react";
import { Activity, Heart, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { InsightCard } from "./dashboard/InsightCard";
import { MetricsCard } from "./dashboard/MetricsCard";
import { MedicationCard } from "./dashboard/MedicationCard";
import { AppointmentCard } from "./dashboard/AppointmentCard";
import { MetricsChart } from "./dashboard/MetricsChart";
import { fetchHealthMetrics } from "@/services/mockHealthData";

const Dashboard = () => {
  const { toast } = useToast();
  
  // Fetch time series data
  const { data: timeSeriesData = [] } = useQuery({
    queryKey: ['healthMetrics'],
    queryFn: fetchHealthMetrics,
  });
  
  // Automatically collected metrics
  const [autoMetrics] = useState({
    heartRate: "72 bpm",
    spo2: "98%",
    bloodPressure: "120/80",
    sleepScore: "85/100",
    sleepDuration: "7.5 hrs",
    snoreCount: "12 events",
    heartRateVariability: "45 ms",
    glucose: "95 mg/dL"
  });

  // Self-reported metrics
  const [selfReportedMetrics] = useState({
    bodyTemperature: "98.6°F",
    painLevel: "2/10",
    weight: "70 kg"
  });

  const [medications] = useState([
    { 
      name: "Lisinopril", 
      time: "8:00 AM", 
      taken: false,
      instructions: "Take with food",
      nextRefill: "March 25, 2024"
    },
    { 
      name: "Metformin", 
      time: "2:00 PM", 
      taken: false,
      instructions: "Take with meals",
      nextRefill: "March 30, 2024"
    }
  ]);

  const [appointments] = useState([
    { 
      doctor: "Dr. Smith", 
      specialty: "Cardiologist", 
      date: "March 15, 2024",
      notes: "Regular checkup + ECG",
      priority: "high"
    },
    { 
      doctor: "Dr. Johnson", 
      specialty: "Endocrinologist", 
      date: "March 20, 2024",
      notes: "Diabetes management review",
      priority: "medium"
    }
  ]);

  const [insights] = useState([
    {
      type: "alert",
      message: "Blood pressure trending higher this week",
      action: "Schedule a check-up",
      severity: "warning"
    },
    {
      type: "tip",
      message: "Walking 30 minutes daily can help manage blood pressure",
      action: "Learn more",
      severity: "info"
    }
  ]);

  const handleInsightAction = (insight: typeof insights[0]) => {
    toast({
      title: insight.type === "alert" ? "Health Alert" : "Health Tip",
      description: insight.message,
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary rounded-full">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Welcome Back</h1>
              <p className="text-gray-600">Your Health Dashboard</p>
            </div>
          </div>
        </header>

        {/* AI Insights Section */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <InsightCard 
                key={index}
                insight={insight}
                onClick={handleInsightAction}
              />
            ))}
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
            title="Other Metrics"
            icon={Activity}
            data={timeSeriesData}
            metrics={[
              { key: 'glucose', name: 'Glucose', color: '#8b5cf6' },
              { key: 'spo2', name: 'SPO2', color: '#3b82f6' },
              { key: 'weight', name: 'Weight', color: '#14b8a6' },
            ]}
          />
        </div>

        {/* Summary Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricsCard
            title="Device Metrics"
            icon={Activity}
            metrics={autoMetrics}
          />
          <MetricsCard
            title="Self-Reported"
            icon={Heart}
            metrics={selfReportedMetrics}
          />
          <MedicationCard medications={medications} />
          <AppointmentCard appointments={appointments} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
