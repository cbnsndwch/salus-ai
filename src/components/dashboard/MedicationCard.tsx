
import { Info, Pill } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Medication {
  name: string;
  time: string;
  taken: boolean;
  instructions: string;
  nextRefill: string;
}

interface MedicationCardProps {
  medications: Medication[];
}

export const MedicationCard = ({ medications }: MedicationCardProps) => {
  const { toast } = useToast();

  return (
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
  );
};
