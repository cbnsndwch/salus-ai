import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchHealthMetrics } from "@/services/mockHealthData";
import { DashboardHeader } from "./dashboard/DashboardHeader";
import { VitalSignsSection } from "./dashboard/VitalSignsSection";
import { SleepMetricsSection } from "./dashboard/SleepMetricsSection";
import { OtherMetricsSection } from "./dashboard/OtherMetricsSection";
import { MedicationCard } from "./dashboard/MedicationCard";
import { AppointmentCard } from "./dashboard/AppointmentCard";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");

  // Fetch health data using mock service
  const { data: healthData = [], isLoading, error } = useQuery({
    queryKey: ["healthMetrics", timeRange],
    queryFn: () => fetchHealthMetrics(timeRange === "30d" ? 30 : timeRange === "14d" ? 14 : 7),
  });

  // Format data for metric cards
  const formatMetricData = (key: string) => {
    return healthData.map((item: any) => ({
      date: item.date,
      value: item[key],
    }));
  };

  // Mock data for medications and appointments (kept as is for now)
  const [medications] = useState([
    {
      name: "Lisinopril",
      time: "8:00 AM",
      taken: false,
      instructions: "Take with food",
      nextRefill: "March 25, 2024",
    },
    {
      name: "Metformin",
      time: "2:00 PM",
      taken: false,
      instructions: "Take with meals",
      nextRefill: "March 30, 2024",
    },
  ]);

  const [appointments] = useState([
    {
      doctor: "Dr. Smith",
      specialty: "Cardiologist",
      date: "March 15, 2024",
      notes: "Regular checkup + ECG",
      priority: "high",
    },
    {
      doctor: "Dr. Johnson",
      specialty: "Endocrinologist",
      date: "March 20, 2024",
      notes: "Diabetes management review",
      priority: "medium",
    },
  ]);

  if (isLoading || error) {
    return (
      <div className={cn(
        "flex items-center justify-center min-h-screen",
        error ? "text-red-500" : ""
      )}>
        {isLoading ? "Loading..." : "Error loading health data. Please try again later."}
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
        
        <SleepMetricsSection 
          data={healthData}
          formatMetricData={formatMetricData}
        />
        
        <OtherMetricsSection 
          data={healthData}
          formatMetricData={formatMetricData}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <MedicationCard medications={medications} />
          <AppointmentCard appointments={appointments} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
