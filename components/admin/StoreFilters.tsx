import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function StoreFilters() {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <Button variant="destructive">Add</Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Sort by ▼</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Newest</DropdownMenuItem>
          <DropdownMenuItem>Oldest</DropdownMenuItem>
          <DropdownMenuItem>Name A–Z</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Location ▼</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>All Cities</DropdownMenuItem>
          <DropdownMenuItem>Dharan</DropdownMenuItem>
          <DropdownMenuItem>Riyadh</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
