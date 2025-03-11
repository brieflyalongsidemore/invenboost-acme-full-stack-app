"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

export const Appointments = () => {
  return (
    <Card className="border bg-muted">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium">Appointments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm">Prescription</div>
            <div className="text-xs text-gray-400">2024-11-15</div>
          </div>
          <div className="text-sm text-blue-400">CVS Pharmacy</div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm">Prescription</div>
            <div className="text-xs text-gray-400">2024-11-15</div>
          </div>
          <div className="text-sm text-blue-400">CVS Pharmacy</div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm">Prescription</div>
            <div className="text-xs text-gray-400">2024-11-15</div>
          </div>
          <div className="text-sm text-blue-400">CVS Pharmacy</div>
        </div>
      </CardContent>
    </Card>
  );
};
