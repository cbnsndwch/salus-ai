
import { AlertTriangle, Brain } from "lucide-react";
import { Card } from "@/components/ui/card";

interface InsightCardProps {
  insight: {
    type: string;
    message: string;
    action: string;
    severity: string;
  };
  onClick: (insight: { type: string; message: string; action: string; severity: string; }) => void;
}

export const InsightCard = ({ insight, onClick }: InsightCardProps) => {
  return (
    <Card 
      className="p-4 backdrop-blur-sm bg-card animate-fadeIn cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(insight)}
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
  );
};
