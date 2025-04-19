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
    <div className="w-full overflow-x-auto rounded-md border border-gray-300 shadow-sm">
      <table
        className="w-full text-sm text-left hidden md:table"
        aria-label="Customer order table"
      >
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th scope="col" className="py-3 px-4 font-medium">Orders</th>
            <th scope="col" className="py-3 px-4 font-medium">Last Update</th>
            <th scope="col" className="py-3 px-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition-colors duration-150"
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
              <td colSpan={3} className="py-8 text-center text-gray-400 bg-white">
                No orders to show.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="space-y-4 md:hidden p-2">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="mb-2">
                <span className="block text-xs text-gray-500">Order</span>
                <span className="font-medium">{order.name}</span>
              </div>
              <div className="mb-2">
                <span className="block text-xs text-gray-500">Last Update</span>
                <span className="text-sm">{order.updated}</span>
              </div>
              <div>
                <span className="block text-xs text-gray-500 mb-1">Status</span>
                <StatusBadge status={order.status} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-8">No orders to show.</div>
        )}
      </div>
    </div>
  );
}