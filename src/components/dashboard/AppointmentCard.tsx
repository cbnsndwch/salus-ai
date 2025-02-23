import { Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Appointment {
  doctor: string;
  specialty: string;
  date: string;
  notes: string;
  priority: string;
}

interface AppointmentCardProps {
  appointments: Appointment[];
}

export const AppointmentCard = ({ appointments }: AppointmentCardProps) => {
  return (
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
              apt.priority === "high"
                ? "border-red-500"
                : apt.priority === "medium"
                  ? "border-yellow-500"
                  : "border-green-500"
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
  );
};
