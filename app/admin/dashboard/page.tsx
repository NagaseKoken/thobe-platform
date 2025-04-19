"use client";

import { useState } from "react";
import Navbar from "@/components/reusable/navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import Footer from "@/components/reusable/Footer";
import { ChartCard } from "@/components/admin/ChartCard";
import { Menu } from "lucide-react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Mock data for charts
const salesData = [
  { name: "Jan", value: 200 },
  { name: "Feb", value: 350 },
  { name: "Mar", value: 420 },
];

const usersData = [
  { name: "Jan", value: 80 },
  { name: "Feb", value: 220 },
  { name: "Mar", value: 190 },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-1">
        {/* Toggle Button */}
        <button
          className="fixed left-4 top-20 p-2 bg-white rounded-lg shadow-lg md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Sidebar */}
        <aside
          className={`
            fixed md:static w-64 bg-white h-full transition-transform
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <Sidebar />
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-6 space-y-6">
          {/* Header with title, status badge, share & more */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <Badge variant="outline">Active</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button>Share</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">•••</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Tabs for Overview / Reports */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Overview pane */}
            <TabsContent value="overview">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartCard
                  title="Sales"
                  value={1_200}
                  change="5% increase"
                  data={salesData}
                />
                <ChartCard
                  title="New Users"
                  value={300}
                  change="2% increase"
                  data={usersData}
                />
              </div>
            </TabsContent>

            {/* Reports pane */}
            <TabsContent value="reports">
              <p>Reports coming soon...</p>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <Footer />
    </div>
  );
}