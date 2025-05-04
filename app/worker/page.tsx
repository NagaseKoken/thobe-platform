"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	ShoppingBagIcon,
	ClipboardIcon,
	PencilSquareIcon,
	IdentificationIcon,
	EnvelopeIcon,
	PhoneIcon,
	UserIcon,
	CalendarIcon,
	BuildingStorefrontIcon,
	ClockIcon,
} from "@heroicons/react/24/outline";
import Navbar from "@/components/reusable/navbar";
import Footer from "@/components/reusable/Footer";

interface Profile {
	name: string;
	email: string;
	phone: string;
	gender: string;
	age: number;
	role: string;
	storeName: string;
	workingHours: string;
}

const Sidebar: React.FC = () => (
	<aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
		<div className="p-6">
			<h2 className="text-lg font-semibold text-gray-800 mb-6">Dashboard</h2>
			<nav className="space-y-4">
				<Link
					href="/worker"
					className="flex items-center px-3 py-2 rounded-md bg-orange-50 text-orange-600 font-medium"
				>
					<UserIcon className="w-5 h-5 mr-3" />
					Profile
				</Link>
				<Link
					href="/worker/orders"
					className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
				>
					<ShoppingBagIcon className="w-5 h-5 mr-3" />
					Orders
				</Link>
				<Link
					href="/worker/fabrics-products"
					className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
				>
					<ClipboardIcon className="w-5 h-5 mr-3" />
					Fabrics & Products
				</Link>
			</nav>
		</div>
	</aside>
);

export default function WorkerProfilePage() {
	const [profile, setProfile] = useState<Profile | null>(null);
	const [edited, setEdited] = useState<Profile | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/worker/profile")
			.then((res) => {
				if (!res.ok) throw new Error("Failed to load profile");
				return res.json();
			})
			.then((data: Profile) => {
				setProfile(data);
				setEdited(data);
			})
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, []);

	const handleEditToggle = () => {
		if (isEditing && edited) {
			setProfile(edited);
			fetch("/api/worker/profile", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(edited),
			}).catch((err) => console.error("Save failed:", err));
		}
		setIsEditing((prev) => !prev);
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		setEdited(
			(prev) =>
				prev && { ...prev, [name]: name === "age" ? Number(value) : value }
		);
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="flex flex-col items-center">
					<svg
						className="animate-spin h-8 w-8 text-orange-500"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8v8H4z"
						/>
					</svg>
					<span className="mt-2 text-gray-600">Loading…</span>
				</div>
			</div>
		);
	}

	if (!profile) {
		return (
			<div className="p-8 text-center text-gray-700">
				<p>Unable to load profile.</p>
			</div>
		);
	}

	const display = isEditing && edited ? edited : profile;

	return (
		<div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
			<Navbar />
			<div className="flex flex-1">
				<Sidebar />
				<main className="flex-1 p-8">
					<div className="mb-6 flex justify-between items-center">
						<h1 className="text-2xl font-bold">My Profile</h1>
						<button
							onClick={handleEditToggle}
							className={`inline-flex items-center px-4 py-2 rounded-md font-medium ${
								isEditing
									? "bg-green-600 text-white hover:bg-green-700"
									: "bg-orange-500 text-white hover:bg-orange-600"
							}`}
						>
							{isEditing ? (
								"Save Changes"
							) : (
								<>
									<PencilSquareIcon className="w-4 h-4 mr-2" />
									Edit Profile
								</>
							)}
						</button>
					</div>

					<div className="bg-white rounded-lg shadow-sm p-8">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
							<div className="flex flex-col items-center">
								<div className="h-48 w-48 rounded-full bg-gray-200 flex items-center justify-center">
									<UserIcon className="h-24 w-24 text-gray-400" />
								</div>
								<h2 className="mt-4 text-xl font-semibold">{display.name}</h2>
								<p className="text-gray-500">{display.role}</p>
							</div>

							<div className="lg:col-span-2">
								<h3 className="text-lg font-semibold mb-4">
									Personal Information
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
									<div>
										<label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
											<IdentificationIcon className="w-4 h-4 mr-1" /> Full Name
										</label>
										{isEditing ? (
											<input
												name="name"
												value={display.name}
												onChange={handleChange}
												className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500"
											/>
										) : (
											<p>{display.name}</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
											<EnvelopeIcon className="w-4 h-4 mr-1" /> Email
										</label>
										{isEditing ? (
											<input
												type="email"
												name="email"
												value={display.email}
												onChange={handleChange}
												className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500"
											/>
										) : (
											<p>{display.email}</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
											<PhoneIcon className="w-4 h-4 mr-1" /> Phone
										</label>
										{isEditing ? (
											<input
												type="tel"
												name="phone"
												value={display.phone}
												onChange={handleChange}
												className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500"
											/>
										) : (
											<p>{display.phone}</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
											<UserIcon className="w-4 h-4 mr-1" /> Gender
										</label>
										{isEditing ? (
											<select
												name="gender"
												value={display.gender}
												onChange={handleChange}
												className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500"
											>
												<option>Male</option>
												<option>Female</option>
												<option>Prefer not to say</option>
											</select>
										) : (
											<p>{display.gender}</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
											<CalendarIcon className="w-4 h-4 mr-1" /> Age
										</label>
										{isEditing ? (
											<input
												type="number"
												name="age"
												min={16}
												max={100}
												value={display.age}
												onChange={handleChange}
												className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500"
											/>
										) : (
											<p>{display.age}</p>
										)}
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
											<IdentificationIcon className="w-4 h-4 mr-1" /> Role
										</label>
										{isEditing ? (
											<input
												name="role"
												value={display.role}
												onChange={handleChange}
												className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500"
											/>
										) : (
											<p>{display.role}</p>
										)}
									</div>
								</div>

								<div className="mt-8 pt-6 border-t border-gray-200">
									<h3 className="text-lg font-semibold mb-4">
										Store Information
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
										<div>
											<label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
												<BuildingStorefrontIcon className="w-4 h-4 mr-1" />{" "}
												Store Name
											</label>
											{isEditing ? (
												<input
													name="storeName"
													value={display.storeName}
													onChange={handleChange}
													className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500"
												/>
											) : (
												<p>{display.storeName}</p>
											)}
										</div>
										<div className="md:col-span-2">
											<label className="block text-sm font-medium text-gray-500 mb-1 flex items-center">
												<ClockIcon className="w-4 h-4 mr-1" /> Working Hours
											</label>
											{isEditing ? (
												<textarea
													name="workingHours"
													value={display.workingHours}
													onChange={handleChange}
													rows={2}
													className="w-full p-2 border border-gray-200 rounded focus:ring-2 focus:ring-orange-500"
												/>
											) : (
												<p>{display.workingHours}</p>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
			<Footer />
		</div>
	);
}
