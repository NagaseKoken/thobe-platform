import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "New Order" | "In Production" | "Ready for Pickup" | "Completed";
}

const statusColors: Record<StatusBadgeProps["status"], string> = {
  "New Order": "bg-red-600 text-white",
  "In Production": "bg-gray-200 text-gray-800",
  "Ready for Pickup": "bg-green-100 text-green-700",
  "Completed": "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "text-xs font-medium px-3 py-1 rounded-full inline-block whitespace-nowrap shadow-sm",
        statusColors[status]
      )}
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
}