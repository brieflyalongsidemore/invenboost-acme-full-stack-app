"use client";

import { useState } from "react";

import { Line } from "react-chartjs-2";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

const temperatureData = {
  labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Temperature",
      data: [36, 36.4, 36.7, 36.5, 36.8, 36.6, 36.7],
      borderColor: "#10b981",
      backgroundColor: "#10b981",
      tension: 0.4,
      pointBackgroundColor: "#10b981",
      pointBorderColor: "#10b981",
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 35,
      max: 40,
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.7)",
      },
    },
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.7)",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const HealthMetrics = () => {
  const [activeTab, setActiveTab] = useState("temperature");

  return (
    <Card className="col-span-1 border bg-muted lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-medium">
          Health Key Metrics
        </CardTitle>
        <Select defaultValue="month">
          <SelectTrigger className="w-[120px] text-sm">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="temperature"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-6 w-full flex-nowrap overflow-x-auto bg-secondary">
            <TabsTrigger
              value="temperature"
              className={
                activeTab === "temperature" ? "text-white" : "text-gray-400"
              }
            >
              Temperature
            </TabsTrigger>
            <TabsTrigger
              value="heartRate"
              className={
                activeTab === "heartRate" ? "text-white" : "text-gray-400"
              }
            >
              Heart Rate
            </TabsTrigger>
            <TabsTrigger
              value="pulseRate"
              className={
                activeTab === "pulseRate" ? "text-white" : "text-gray-400"
              }
            >
              Pulse Rate
            </TabsTrigger>
            <TabsTrigger
              value="bloodPressure"
              className={
                activeTab === "bloodPressure" ? "text-white" : "text-gray-400"
              }
            >
              Blood Pressure
            </TabsTrigger>
          </TabsList>
          <TabsContent value="temperature" className="h-[250px] md:h-[300px]">
            <Line data={temperatureData} options={chartOptions} />
          </TabsContent>
          <TabsContent value="heartRate" className="h-[250px] md:h-[300px]">
            <Line data={temperatureData} options={chartOptions} />
          </TabsContent>
          <TabsContent value="pulseRate" className="h-[250px] md:h-[300px]">
            <Line data={temperatureData} options={chartOptions} />
          </TabsContent>
          <TabsContent value="bloodPressure" className="h-[250px] md:h-[300px]">
            <Line data={temperatureData} options={chartOptions} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
