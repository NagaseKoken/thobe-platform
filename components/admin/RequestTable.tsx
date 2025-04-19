import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
          <TableHead>Actions</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.id}>
            <TableCell>{item.storeOwner}</TableCell>
            <TableCell>{item.requestType}</TableCell>
            <TableCell className="space-x-2">
              <Button size="sm" variant="outline">Accept</Button>
              <Button size="sm" variant="outline">Reject</Button>
            </TableCell>
            <TableCell>
              <Badge
                variant={
                  item.status === "Approved" ? "default" :
                  item.status === "Rejected" ? "destructive" :
                  "secondary"
                }
              >
                {item.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
