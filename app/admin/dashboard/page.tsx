"use client";

import { useState, useEffect } from "react";
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

interface DataPoint {
  name: string;
  value: number;
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [storeCount, setStoreCount] = useState(0);
  const [salesData, setSalesData] = useState<DataPoint[]>([]);
  const [usersData, setUsersData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      try {
        const [usersRes, storesRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/stores"),
        ]);

        const users: any[] = await usersRes.json();
        const stores: any[] = await storesRes.json();

        // Overall counts
        const totalUsers = Array.isArray(users) ? users.length : 0;
        const totalStores = Array.isArray(stores) ? stores.length : 0;
        setUserCount(totalUsers);
        setStoreCount(totalStores);

        // Build last 30 days array
        const last30Dates: Date[] = [];
        for (let i = 29; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          last30Dates.push(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
        }

        const labels = last30Dates.map((d) =>
          d.toLocaleDateString(undefined, { month: "short", day: "numeric" })
        );

        // --- Stores: daily new and cumulative ---
        const newStoresPerDay = last30Dates.map((date) =>
          stores.filter((s) => {
            const ts = s.createdAt || s.created_at || s.date;
            if (!ts) return false;
            const created = new Date(ts);
            return (
              created.getFullYear() === date.getFullYear() &&
              created.getMonth() === date.getMonth() &&
              created.getDate() === date.getDate()
            );
          }).length
        );

        const cumulativeStores = newStoresPerDay.reduce<number[]>((acc, count, idx) => {
          acc.push(idx === 0 ? count : count + acc[idx - 1]);
          return acc;
        }, []);

        setSalesData(
          labels.map((name, idx) => ({
            name,
            value: cumulativeStores[idx],
          }))
        );

        // --- Users: daily new and cumulative ---
        let newUsersPerDay = last30Dates.map((date) =>
          users.filter((u) => {
            const ts = u.createdAt || u.created_at || u.date;
            if (!ts) return false;
            const created = new Date(ts);
            return (
              created.getFullYear() === date.getFullYear() &&
              created.getMonth() === date.getMonth() &&
              created.getDate() === date.getDate()
            );
          }).length
        );

        const hasUserTimestamps = newUsersPerDay.some((n) => n > 0);

        if (!hasUserTimestamps) {
          // If no timestamps, show all users only on the last day
          newUsersPerDay = newUsersPerDay.map((_, idx) =>
            idx === newUsersPerDay.length - 1 ? totalUsers : 0
          );
        }

        const cumulativeUsers = newUsersPerDay.reduce<number[]>((acc, count, idx) => {
          acc.push(idx === 0 ? count : count + acc[idx - 1]);
          return acc;
        }, []);

        setUsersData(
          labels.map((name, idx) => ({
            name,
            value: cumulativeUsers[idx],
          }))
        );
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setUserCount(0);
        setStoreCount(0);
        setSalesData([]);
        setUsersData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-1">
        <button
          className="fixed left-4 top-20 p-2 bg-white rounded-lg shadow-lg md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <aside
          className={`
            fixed md:static w-64 bg-white h-full transition-transform
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >
          <Sidebar />
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ChartCard title="Stores" value={storeCount} change="" data={salesData} />
                <ChartCard title="Users" value={userCount} change="" data={usersData} />
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <p>Reports not coming soon.</p>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <Footer />
    </div>
  );
}
