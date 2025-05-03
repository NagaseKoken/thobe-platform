import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store as StoreIcon, MapPin, Star, Package } from "lucide-react";
import type { Store } from "@/types";

interface StoreCardProps {
  store: Store;
}






export function StoreCard({ store }: StoreCardProps) {
  const { id, name, location, rating, status, products } = store;
  const productCount = Array.isArray(products) ? products.length : 0;

  const handleRemove = async () => {
    if (!confirm("Remove this store?")) return;
    const res = await fetch(`/api/stores/${id}`, { method: "DELETE" });
    if (!res.ok) console.error("Failed to remove store:", await res.text());
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow border space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <StoreIcon className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold">{name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
          </div>
        </div>
        <Badge variant={status ? "success" : "destructive"}>
          {status ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-sm">
        <div className="flex items-center">
          <Star className="h-4 w-4 mr-1" />
          {rating}/5
        </div>
        <div className="flex items-center">
          <Package className="h-4 w-4 mr-1" />
          {productCount} products
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link href={`/admin/stores/${id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            Details
          </Button>
        </Link>
        <Button
          variant="destructive"
          size="icon"
          onClick={handleRemove}
          title="Remove store"
        >
          ✕
        </Button>
      </div>
    </div>
  );
}