import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface OrderFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function OrderFilters({ 
  currentFilter, 
  onFilterChange,
  searchQuery,
  onSearchChange
}: OrderFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <Input 
        placeholder="Search by Order ID or Customer" 
        className="flex-1 min-w-[200px]"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Status: {currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)} ▼
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onFilterChange("all")}>
            All
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("pending")}>
            Pending
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("shipped")}>
            Shipped
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("delivered")}>
            Delivered
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}