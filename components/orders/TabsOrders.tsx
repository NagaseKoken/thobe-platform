import OrderTable from "@/components/orders/OrderTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { PackageSearch, PackageCheck } from "lucide-react";

// const activeOrders: Order[] = [
//   { name: "Mohammed Al Naser", updated: "5 Min Ago", status: "New Order" },
//   { name: "Ali AlBugeeay", updated: "Yesterday", status: "Ready for Pickup" },
//   { name: "Moammal Almahfoudh", updated: "2 Days Ago", status: "In Production" },
// ];

// const completedOrders: Order[] = [
//   { name: "Salim AlDossari", updated: "2 Weeks Ago", status: "Completed" },
//   { name: "Mona AlShehri", updated: "3 Weeks Ago", status: "Completed" },
// ];

export default async function TabsOrders() {
	const activeOrders = await db.order.findMany({
		where: {
			status: {
				not: "completed",
			},
		},
		include: {
			user: true,
		},
	});
	const completedOrders = await db.order.findMany({
		where: { status: "completed" },
		include: {
			user: true,
		},
	});

	return (
		<Tabs defaultValue="active" className="w-full">
			<TabsList>
				<TabsTrigger value="active">
					<PackageSearch className="w-4 h-4" />
					Active Orders
				</TabsTrigger>
				<TabsTrigger value="completed">
					<PackageCheck className="w-4 h-4" />
					Completed Orders
				</TabsTrigger>
			</TabsList>

			<TabsContent value="active">
				<OrderTable orders={activeOrders} />
			</TabsContent>
			<TabsContent value="completed">
				<OrderTable orders={completedOrders} />
			</TabsContent>
		</Tabs>
	);
}
