"use client";

import { useState } from "react";
import Navbar from "@/components/reusable/navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import Footer from "@/components/reusable/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu, Search, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddUserModal } from "@/components/admin/AddUserModal";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/actions/user-actions";
import { createUser } from "@/actions/create-user";
import { toast } from "sonner";
import { queryClient } from "@/components/reusable/provider";
export default function UserManagementPage() {
	// const [users, setUsers] = useState<User[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	// const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { data: users, isPending: loading } = useQuery({
		queryKey: ["users"],
		queryFn: getUsers,
	});
	// useEffect(() => {
	//   fetchUsers();
	// }, []);

	// const fetchUsers = async () => {
	//   try {
	//     const response = await fetch('/api/users');
	//     const data = await response.json();
	//     setUsers(data);
	//   } catch (error) {
	//     console.error(error);
	//     setMessage({ text: 'Failed to fetch users', type: 'error' });
	//   }
	// };

	const handleCreateUser = async (userData: {
		name: string;
		email: string;
		password: string;
		role: UserRole;
	  }) => {
		try {
		  const result = await createUser(userData);
		  
		  if (result.error) {
			toast.error(result.error);
			return;
		  }
		  
		  toast.success("User created successfully!");
		  queryClient.invalidateQueries({ queryKey: ["users"] });
		  setIsAddModalOpen(false);
		} catch (error) {
		  console.error(error);
		  toast.error("Error creating user");
		}
	  };

	const filteredUsers = users?.filter(
		(user) =>
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.role?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const userCounts = {
		total: users?.length,
		admin: users?.filter((u) => u.role?.toUpperCase() === "ADMIN").length,
		owner: users?.filter((u) => u.role?.toUpperCase() === "OWNER").length,
		worker: users?.filter((u) => u.role?.toUpperCase() === "WORKER").length,
		customer: users?.filter((u) => u.role?.toUpperCase() === "USER").length,
	};
	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-lg">Loading...</div>
			</div>
		);
	}
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<div className="flex flex-1">
				<button
					className="fixed left-4 top-20 p-2 bg-white rounded-lg shadow-lg md:hidden"
					onClick={() => setSidebarOpen((x) => !x)}
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
								<CardTitle className="text-sm font-medium text-gray-500">
									Total Users
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-semibold">{userCounts.total}</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-gray-500">
									Admins
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-semibold">{userCounts.admin}</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-gray-500">
									Shop Owners
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-semibold">{userCounts.owner}</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-gray-500">
									Workers
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-semibold">
									{userCounts.worker}
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium text-gray-500">
									Customers
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-semibold">
									{userCounts.customer}
								</div>
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
								{filteredUsers?.map((user) => (
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
			<Footer />
		</div>
	);
}
