
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Heart, Pill, User } from "lucide-react";

const Dashboard = () => {
  const [healthMetrics] = useState({
    heartRate: "72 bpm",
    bloodPressure: "120/80",
    weight: "70 kg",
    sleep: "7.5 hrs",
  });

  const [medications] = useState([
    { name: "Vitamin D", time: "8:00 AM", taken: false },
    { name: "Omega-3", time: "2:00 PM", taken: false },
  ]);

  const [appointments] = useState([
    { doctor: "Dr. Smith", specialty: "General", date: "March 15, 2024" },
    { doctor: "Dr. Johnson", specialty: "Dental", date: "March 20, 2024" },
  ]);

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
              <p className="text-gray-600">Let's check your health status</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Health Metrics */}
          <Card className="p-6 backdrop-blur-sm bg-card animate-fadeIn">
            <div className="flex items-center space-x-3 mb-4">
              <Heart className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Health Metrics</h2>
            </div>
            <div className="space-y-3">
              {Object.entries(healthMetrics).map(([metric, value]) => (
                <div key={metric} className="flex justify-between items-center">
                  <span className="text-gray-600 capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Medications */}
          <Card className="p-6 backdrop-blur-sm bg-card animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center space-x-3 mb-4">
              <Pill className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Today's Medications</h2>
            </div>
            <div className="space-y-3">
              {medications.map((med, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                  <div>
                    <p className="font-medium">{med.name}</p>
                    <p className="text-sm text-gray-500">{med.time}</p>
                  </div>
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </Card>

          {/* Appointments */}
          <Card className="p-6 backdrop-blur-sm bg-card animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
            </div>
            <div className="space-y-3">
              {appointments.map((apt, index) => (
                <div key={index} className="p-3 bg-white rounded-lg shadow-sm">
                  <p className="font-medium">{apt.doctor}</p>
                  <p className="text-sm text-gray-500">{apt.specialty}</p>
                  <p className="text-sm text-primary mt-1">{apt.date}</p>
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
