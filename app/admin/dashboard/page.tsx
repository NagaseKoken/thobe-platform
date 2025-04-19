import Navbar from "@/components/reusable/navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import Footer from "@/components/reusable/Footer";
import { ChartCard } from "@/components/admin/ChartCard";

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

// — mock data, swap these out for your real API results —
const salesData = [
  { name: "Jan", value: 200 },
  { name: "Feb", value: 350 },
  { name: "Mar", value: 420 },
  /* … */
];
const usersData = [
  { name: "Jan", value: 80 },
  { name: "Feb", value: 220 },
  { name: "Mar", value: 190 },
  /* … */
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6 space-y-6">
          {/* — Header with title, status badge, share & more */}
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

          {/* — Tabs for Overview / Reports */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* — Overview pane */}
            <TabsContent value="overview">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="flex gap-6">
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

            {/* — Reports pane (stub) */}
            <TabsContent value="reports">
              <p>Reports coming soon…</p>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <Footer />
    </div>
  );
}
