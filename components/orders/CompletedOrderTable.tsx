import StatusBadge from "@/components/reusable/StatusBadge";

interface Order {
    name: string;
    updated: string;
    status: "Completed";
  }
  

const completedOrders: Order[] = [
    { name: "Salim AlDossari", updated: "2 Weeks Ago", status: "Completed" },
    { name: "Mona AlShehri", updated: "3 Weeks Ago", status: "Completed" },
    { name: "Fahad AlHarthi", updated: "1 Month Ago", status: "Completed" },
    { name: "Layla AlAnzi", updated: "1 Month Ago", status: "Completed" },
    { name: "Omar AlSuwailem", updated: "2 Months Ago", status: "Completed" },
  ];  

export default function CompletedOrderTable() {
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
          {completedOrders.map((order, index) => (
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