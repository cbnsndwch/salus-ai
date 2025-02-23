
import { Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DashboardHeaderProps {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
}

export const DashboardHeader = ({ timeRange, onTimeRangeChange }: DashboardHeaderProps) => {
  return (
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
        <Select defaultValue={timeRange} onValueChange={onTimeRangeChange}>
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
      </div>
    </header>
  );
};
