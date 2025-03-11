"use client";

import { Apple, Eye, Pill, Brain, Ribbon } from "lucide-react";

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

export const VirtualCare = () => {
  return (
    <div className="p-4 md:p-6">
      <Card className="border bg-muted">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-medium">
            Virtual Care Options
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <Card className="border bg-muted">
              <CardContent className="flex flex-col items-center p-4 md:p-6">
                <div className="mb-4 text-blue-400">
                  <Apple className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium md:text-base">
                    Nutrition
                  </div>
                  <div className="text-xs text-gray-400 md:text-sm">36.7</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-muted">
              <CardContent className="flex flex-col items-center p-4 md:p-6">
                <div className="mb-4 text-blue-400">
                  <Brain className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium md:text-base">
                    Psychology
                  </div>
                  <div className="text-xs text-gray-400 md:text-sm">36.7</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-muted">
              <CardContent className="flex flex-col items-center p-4 md:p-6">
                <div className="mb-4 text-blue-400">
                  <Ribbon className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium md:text-base">
                    Oncology
                  </div>
                  <div className="text-xs text-gray-400 md:text-sm">36.7</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-muted">
              <CardContent className="flex flex-col items-center p-4 md:p-6">
                <div className="mb-4 text-blue-400">
                  <Eye className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium md:text-base">Vision</div>
                  <div className="text-xs text-gray-400 md:text-sm">36.7</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border bg-muted">
              <CardContent className="flex flex-col items-center p-4 md:p-6">
                <div className="mb-4 text-blue-400">
                  <Pill className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium md:text-base">
                    Medication
                  </div>
                  <div className="text-xs text-gray-400 md:text-sm">36.7</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
