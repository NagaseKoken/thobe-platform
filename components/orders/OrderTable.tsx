import StatusBadge from "@/components/reusable/StatusBadge";

interface Order {
  name: string;
  updated: string;
  status: "New Order" | "In Production" | "Ready for Pickup";
}

const orders: Order[] = [
  { name: "Mohammed Al Naser", updated: "5 Min Ago", status: "New Order" },
  { name: "Ali AlBugeeay", updated: "Yesterday", status: "Ready for Pickup" },
  { name: "Moammal Almahfoudh", updated: "2 Days Ago", status: "In Production" },
  { name: "Reda Alali", updated: "4 Days Ago", status: "In Production" },
  { name: "Husian Al Muallim", updated: "5 Days Ago", status: "Ready for Pickup" },
  { name: "Abdulrhman Al faleh", updated: "12 Days Ago", status: "In Production" },
  { name: "Mohammed Ali", updated: "Last Month", status: "Ready for Pickup" },
  { name: "Ahmed Mohammed", updated: "2 Months Ago", status: "Ready for Pickup" },
  { name: "Yasmine Kamel", updated: "2 Months Ago", status: "Ready for Pickup" },
];

export default function OrderTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="border-b border-gray-300">
          <tr>
            <th className="py-2 px-4 font-medium text-gray-600">Orders</th>
            <th className="py-2 px-4 font-medium text-gray-600">Last Update</th>
            <th className="py-2 px-4 font-medium text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-3 px-4">{order.name}</td>
              <td className="py-3 px-4">{order.updated}</td>
              <td className="py-3 px-4">
                <StatusBadge status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
