"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";

interface OrderDetailDrawerProps {
  orderId: string;
  open: boolean;
  onClose: () => void;
}

export function OrderDetailDrawer({ orderId, open, onClose }: OrderDetailDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent position="right" size="lg">
        <SheetHeader>
          <SheetTitle>Order Details: #{orderId}</SheetTitle>
          <SheetClose asChild>
            <button className="text-xl">×</button>
          </SheetClose>
        </SheetHeader>
        <div className="mt-4 space-y-2">
          <p><strong>Shipping Address:</strong> 123 Main St, Dharan, KSA</p>
          <p><strong>Payment:</strong> Credit Card</p>
          <h3 className="mt-4 font-semibold">Items</h3>
          <ul className="list-disc pl-5">
            <li>Thobe Classic ×1 — $35.00</li>
            <li>Scarf Deluxe ×2 — $50.00</li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}