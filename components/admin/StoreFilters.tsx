import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface StoreFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export function StoreFilters({
  searchQuery,
  onSearchChange,
  currentFilter,
  onFilterChange
}: StoreFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <Input 
        placeholder="Search by Store Name" 
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
            All Stores
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("active")}>
            Active
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onFilterChange("pending")}>
            Pending
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}