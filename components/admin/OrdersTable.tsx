import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export type Order = {
  id: string;
  date: string;
  customer: string;
  total: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
};

interface OrdersTableProps {
  items: Order[];
  onView: (id: string) => void;
}

const statusVariant: Record<Order["status"], string> = {
  Pending: "secondary",
  Processing: "outline",
  Shipped: "secondary",
  Delivered: "success",
  Cancelled: "destructive",
};

export function OrdersTable({ items, onView }: OrdersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((o) => (
          <TableRow key={o.id} className="hover:bg-muted/50">
            <TableCell>#{o.id}</TableCell>
            <TableCell>{o.date}</TableCell>
            <TableCell>{o.customer}</TableCell>
            <TableCell>{o.total}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[o.status] as any}>{o.status}</Badge>
            </TableCell>
            <TableCell>
              <Button size="sm" variant="outline" onClick={() => onView(o.id)}>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
