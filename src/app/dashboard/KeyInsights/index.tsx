"use client";

import { Activity, Heart, Thermometer, Droplets } from "lucide-react";

import { Card, CardContent } from "@/app/components/ui/card";

export const KeyInsightsCards = () => {
  return (
    <div className="col-span-1 grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2 md:grid-cols-3 lg:col-span-5 lg:grid-cols-5">
      <Card className="border bg-muted">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="rounded-full bg-muted p-2">
            <Thermometer className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <div className="text-xs text-gray-400">Temperature</div>
            <div className="font-medium">36.7 C</div>
          </div>
        </CardContent>
      </Card>

      <Card className="border bg-muted">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="rounded-full bg-muted p-2">
            <Heart className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <div className="text-xs text-gray-400">Heart Rate</div>
            <div className="font-medium">95 rpm</div>
          </div>
        </CardContent>
      </Card>

      <Card className="border bg-muted">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="rounded-full bg-muted p-2">
            <Activity className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <div className="text-xs text-gray-400">Pulse Rate</div>
            <div className="font-medium">88 bpm</div>
          </div>
        </CardContent>
      </Card>

      <Card className="border bg-muted">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="rounded-full bg-muted p-2">
            <Droplets className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <div className="text-xs text-gray-400">Blood Pressure</div>
            <div className="font-medium">120/80 mm Hg</div>
          </div>
        </CardContent>
      </Card>

      <Card className="border bg-muted">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="rounded-full bg-muted p-2">
            <Droplets className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <div className="text-xs text-gray-400">CGM</div>
            <div className="font-medium">85 mg/dL</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
