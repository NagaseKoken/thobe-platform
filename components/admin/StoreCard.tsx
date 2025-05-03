import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store as StoreIcon, MapPin, Star, Package } from "lucide-react";
import type { Product, Store } from "@prisma/client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch(`/api/stores/${store.id}/products`);
      if (!res.ok) throw new Error('Failed to fetch products');
      setProducts(await res.json());
    }
    loadProducts();
  }, [store.id]);

  const { id, name, location, rating, status, image } = store;

  const handleRemove = async () => {
    if (!confirm("Remove this store?")) return;
    const res = await fetch(`/api/stores/${id}`, { method: "DELETE" });
    if (!res.ok) console.error("Failed to remove store:", await res.text());
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <StoreIcon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{store.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              {store.location}
            </div>
          </div>
        </div>
        <Badge variant={store.status === 'active' ? "success" : "warning"}>
          {store.status}
        </Badge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-sm">{store.rating}/5</span>
        </div>
        <div className="flex items-center">
          <Package className="h-4 w-4 mr-1" />
          {products.length} products
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button variant="outline" className="flex-1">View Details</Button>
        <Button variant="destructive" size="icon">⋮</Button>
      </div>
    </div>
  );
}