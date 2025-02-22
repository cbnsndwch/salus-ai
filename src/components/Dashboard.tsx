
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  Activity, 
  Calendar, 
  Clock, 
  Heart, 
  Pill, 
  User, 
  Info,
  AlertTriangle,
  Brain
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  
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
              <Card 
                key={index}
                className="p-4 backdrop-blur-sm bg-card animate-fadeIn cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleInsightAction(insight)}
              >
                <div className="flex items-center space-x-3">
                  {insight.severity === "warning" ? (
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Brain className="w-5 h-5 text-primary" />
                  )}
                  <div>
                    <p className="font-medium">{insight.message}</p>
                    <p className="text-sm text-primary">{insight.action}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Automatic Metrics */}
          <Card className="p-6 backdrop-blur-sm bg-card animate-fadeIn">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Device Metrics</h2>
            </div>
            <div className="space-y-3">
              {Object.entries(autoMetrics).map(([metric, value]) => (
                <div key={metric} className="flex justify-between items-center">
                  <span className="text-gray-600 capitalize">
                    {metric.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Self-Reported Metrics */}
          <Card className="p-6 backdrop-blur-sm bg-card animate-fadeIn">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Self-Reported</h2>
            </div>
            <div className="space-y-3">
              {Object.entries(selfReportedMetrics).map(([metric, value]) => (
                <div key={metric} className="flex justify-between items-center">
                  <span className="text-gray-600 capitalize">
                    {metric.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Medications */}
          <Card className="p-6 backdrop-blur-sm bg-card animate-fadeIn">
            <div className="flex items-center space-x-3 mb-4">
              <Pill className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Medications</h2>
            </div>
            <div className="space-y-3">
              {medications.map((med, index) => (
                <div key={index} className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{med.name}</p>
                      <p className="text-sm text-gray-500">{med.time}</p>
                      <p className="text-xs text-gray-400 mt-1">{med.instructions}</p>
                    </div>
                    <Info 
                      className="w-5 h-5 text-gray-400 cursor-pointer hover:text-primary transition-colors"
                      onClick={() => toast({
                        title: med.name,
                        description: `Next refill: ${med.nextRefill}`,
                      })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Appointments */}
          <Card className="p-6 backdrop-blur-sm bg-card animate-fadeIn">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Appointments</h2>
            </div>
            <div className="space-y-3">
              {appointments.map((apt, index) => (
                <div 
                  key={index} 
                  className={`p-3 bg-white rounded-lg shadow-sm border-l-4 ${
                    apt.priority === "high" ? "border-red-500" : 
                    apt.priority === "medium" ? "border-yellow-500" : 
                    "border-green-500"
                  }`}
                >
                  <p className="font-medium">{apt.doctor}</p>
                  <p className="text-sm text-gray-500">{apt.specialty}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-primary">{apt.date}</p>
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{apt.notes}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
