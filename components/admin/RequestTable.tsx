import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Request = {
  id: string;
  storeOwner: string;
  requestType: string;
  status: "Pending" | "Approved" | "Rejected";
};

interface RequestsTableProps {
  items: Request[];
}

export function RequestsTable({ items }: RequestsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Store Owner</TableHead>
          <TableHead>Request Type</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.id}>
            <TableCell>{item.storeOwner}</TableCell>
            <TableCell>{item.requestType}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Badge 
                    variant={
                      item.status === "Approved" ? "default" :
                      item.status === "Rejected" ? "destructive" :
                      "secondary"
                    }
                    className="cursor-pointer"
                  >
                    {item.status}
                  </Badge>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    className="text-green-600"
                    disabled={item.status === "Approved"}
                  >
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600"
                    disabled={item.status === "Rejected"}
                  >
                    Reject
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}