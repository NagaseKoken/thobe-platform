import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function OrderFilters() {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <Button variant="outline" size="sm">Today</Button>
      <Button variant="outline" size="sm">This Month</Button>

      <Input placeholder="Search by Order ID or Customer" className="flex-1 min-w-[200px]" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">Status ▼</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>All</DropdownMenuItem>
          <DropdownMenuItem>Pending</DropdownMenuItem>
          <DropdownMenuItem>Processing</DropdownMenuItem>
          <DropdownMenuItem>Shipped</DropdownMenuItem>
          <DropdownMenuItem>Delivered</DropdownMenuItem>
          <DropdownMenuItem>Cancelled</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
