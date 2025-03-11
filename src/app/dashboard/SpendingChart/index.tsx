"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
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

import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Doughnut } from "react-chartjs-2";

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

const doughnutData = {
  labels: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
  datasets: [
    {
      data: [35, 35, 30],
      backgroundColor: [
        "rgba(59, 130, 246, 0.8)",
        "rgba(249, 115, 22, 0.8)",
        "rgba(16, 185, 129, 0.8)",
      ],
      borderWidth: 0,
    },
  ],
};
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "70%",
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const SpendingChart = () => {
  return (
    <Card className="border bg-muted">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-medium">Metrics</CardTitle>
        <Select defaultValue="medications">
          <SelectTrigger className="w-[140px] text-sm">
            <SelectValue placeholder="Medications" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="medications">Medications</SelectItem>
            <SelectItem value="vitals">Vitals</SelectItem>
            <SelectItem value="activities">Activities</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm">December</div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative h-[180px] md:h-[200px]">
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <div className="text-sm text-gray-400">Lorem ipsum</div>
            <div className="ml-auto text-sm">35%</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-orange-500"></div>
            <div className="text-sm text-gray-400">Lorem ipsum</div>
            <div className="ml-auto text-sm">35%</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <div className="text-sm text-gray-400">Lorem ipsum</div>
            <div className="ml-auto text-sm">30%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
