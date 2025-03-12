"use client";

import { useState } from "react";
import {
  Calendar,
  FileText,
  Home,
  LogOut,
  Menu,
  PhoneIcon,
  Settings,
  Users,
} from "lucide-react";
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
import Image from "next/image";

import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";

import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import { HealthMetrics } from "./HealthMetrics";
import { KeyInsightsCards } from "./KeyInsights";
import { SpendingChart } from "./SpendingChart";
import { Appointments } from "./Appointments";
import { VirtualCare } from "./VirtualCareOptions";
import AddyAvatar from "../../../assets/illustrations/addy-avatar.png";
import { signOut } from "next-auth/react";

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

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="mb-12 text-3xl font-bold">Acme</div>

      <nav className="flex-1 space-y-6">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-white"
        >
          <Home className="h-5 w-5" />
          Home
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-400"
        >
          <Calendar className="h-5 w-5" />
          Appointment
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-400"
        >
          <FileText className="h-5 w-5" />
          Health Record
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-400"
        >
          <Users className="h-5 w-5" />
          Insurances
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-gray-400"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Button>
      </nav>

      <Button
        onClick={async () => {
          await signOut({
            redirect: true,
            callbackUrl: "/auth/sign-in",
          });
        }}
        variant="ghost"
        className="mt-auto w-full justify-start gap-3 text-gray-400"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </Button>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="sticky hidden h-screen w-64 flex-col border-r bg-muted p-6 md:flex">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 border border-r bg-black p-6">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="flex items-center border border-b p-4 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </Sheet>
          <div className="mx-auto text-xl font-bold">Acme</div>
        </div>

        {/* Header */}
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
            {/* Welcome Section */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <div className="mb-2 text-xl font-bold md:text-2xl">
                Welcome, Kim!
              </div>
              <div className="text-sm text-gray-400">
                Get your latest appointments and goals.
              </div>
            </div>

            {/* Health Metrics Cards */}
            <KeyInsightsCards />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 gap-6 p-4 md:p-6 lg:grid-cols-3">
          <HealthMetrics />
          {/* Health Key Metrics */}

          {/* Right Sidebar */}
          <div className="col-span-1 space-y-6">
            {/* Talk to Doctor */}
            <Card className="border bg-muted">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="h-12 w-12 overflow-hidden rounded-full md:h-16 md:w-16">
                  <Image
                    src={AddyAvatar.src}
                    alt="Doctor"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium md:text-xl">
                    Talk to Addy
                  </h3>
                </div>
                <button className="rounded-full bg-primary p-3">
                  <PhoneIcon />
                </button>
              </CardContent>
            </Card>

            {/* Metrics */}
            <SpendingChart />

            {/* Appointments */}
            <Appointments />
          </div>
        </div>

        {/* Virtual Care Options */}
        <VirtualCare />
      </div>
    </div>
  );
}
