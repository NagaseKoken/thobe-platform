"use client";

import { useState, useEffect } from "react";
import { UserRole } from "@prisma/client";
import Navbar from "@/components/reusable/navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import Footer from "@/components/reusable/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu, Search, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddUserModal } from "@/components/admin/AddUserModal";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
      setMessage({ text: 'Failed to fetch users', type: 'error' });
    }
  };

  const handleCreateUser = async (userData: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: 'User created successfully!', type: 'success' });
        fetchUsers();
      } else {
        setMessage({ text: data.error || 'Failed to create user', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred', type: 'error' });
      throw error;
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const userCounts = {
    total: users.length,
    admin: users.filter(u => u.role === 'ADMIN').length,
    owner: users.filter(u => u.role === 'OWNER').length,
    worker: users.filter(u => u.role === 'WORKER').length,
    customer: users.filter(u => u.role === 'USER').length,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <button
          className="fixed left-4 top-20 p-2 bg-white rounded-lg shadow-lg md:hidden"
          onClick={() => setSidebarOpen(x => !x)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <aside
          className={`fixed md:static w-64 bg-white h-full transition-transform
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
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
            <h1 className="text-3xl font-bold">User Management</h1>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{userCounts.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Admins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{userCounts.admin}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Shop Owners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{userCounts.owner}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{userCounts.worker}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{userCounts.customer}</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-2 text-left text-sm">Name</th>
                  <th className="p-2 text-left text-sm">Email</th>
                  <th className="p-2 text-left text-sm">Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      
      <AddUserModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateUser}
      />
      
      {message && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
          message.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {message.text}
        </div>
      )}
      
      <Footer />
    </div>
  );
}