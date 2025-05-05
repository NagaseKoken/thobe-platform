"use server";
import { db } from "@/lib/db";

export async function getUserInfo(id: string) {
	if (!id) {
		throw new Error("Missing id");
	}
	try {
		const user = await db.user.findUnique({
			where: { id },
			include: { orders: true },
		});
		return user;
	} catch (err) {
		console.error(err);
		throw new Error("Error fetching user");
	}
}
export async function updateUserInfo({ id, data }: { id: string; data: any }) {
	try {
		if (!id) {
			throw new Error("Missing id");
		}
		const updated = await db.user.update({
			where: { id },
			data,
		});
		return updated;
	} catch (err) {
		console.error(err);
		throw new Error("Error updating user");
	}
}

export async function deleteUser(id: string) {
	if (!id) {
		throw new Error("Missing id");
	}
	try {
		const updated = await db.user.delete({
			where: { id },
		});
		return updated;
	} catch (err) {
		console.error(err);
		throw new Error("Error deleting user");
	}
}
export async function getUsers() {
	try {
		const users = await db.user.findMany();
		return users;
	} catch (err) {
		console.error(err);
		throw new Error("Error fetching users");
	}
}

export async function updateRole(id: string, role: string) {
	try {
		if (!id) {
			throw new Error("Missing id");
		}
		const updated = await db.user.update({
			where: { id },
			data: { role },
		});
		return updated;
	} catch (err) {
		console.error(err);
		throw new Error("Error updating role");
	}
}
export async function getDashboardData() {
	try {
		const users = await db.user.findMany();
		const stores = await db.store.findMany();

		// Overall counts
		const totalUsers = Array.isArray(users) ? users.length : 0;
		const totalStores = Array.isArray(stores) ? stores.length : 0;

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
		const newStoresPerDay = last30Dates.map(
			(date) =>
				stores.filter((s) => {
					const ts = s.created_at;
					if (!ts) return false;
					const created = new Date(ts);
					return (
						created.getFullYear() === date.getFullYear() &&
						created.getMonth() === date.getMonth() &&
						created.getDate() === date.getDate()
					);
				}).length
		);

		const cumulativeStores = newStoresPerDay.reduce<number[]>(
			(acc, count, idx) => {
				acc.push(idx === 0 ? count : count + acc[idx - 1]);
				return acc;
			},
			[]
		);

		const salesData = labels.map((name, idx) => ({
			name,
			value: cumulativeStores[idx],
		}));

		// --- Users: daily new and cumulative ---
		let newUsersPerDay = last30Dates.map(
			(date) =>
				users.filter((u) => {
					const ts = u.createdAt;
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

		const cumulativeUsers = newUsersPerDay.reduce<number[]>(
			(acc, count, idx) => {
				acc.push(idx === 0 ? count : count + acc[idx - 1]);
				return acc;
			},
			[]
		);

		const usersData = labels.map((name, idx) => ({
			name,
			value: cumulativeUsers[idx],
		}));

		return { salesData, usersData };
	} catch (err) {
		console.error(err);
		throw new Error("Error fetching dashboard data");
	}
}
