import StatusBadge from "@/components/reusable/StatusBadge";

export interface Order {
  name: string;
  updated: string;
  status: "New Order" | "In Production" | "Ready for Pickup" | "Completed";
}

interface OrderTableProps {
  orders: Order[];
}

export default function OrderTable({ orders }: OrderTableProps) {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-400">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 font-medium text-gray-600">Orders</th>
            <th className="py-3 px-4 font-medium text-gray-600">Last Update</th>
            <th className="py-3 px-4 font-medium text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-500">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr
                key={index}
                className="hover:bg-gray-200 transition-colors duration-150"
              >
                <td className="py-3 px-4">{order.name}</td>
                <td className="py-3 px-4">{order.updated}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="py-6 text-center text-gray-400 bg-white"
              >
                No orders to show.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}