import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";

export type Store = {
  id: string;
  name: string;
  location: string;
};

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <h2 className="text-lg font-semibold">{store.name}</h2>
        <p className="text-sm text-muted-foreground">{store.location}</p>
      </CardHeader>
      <CardContent className="flex space-x-4">
        <Link
          href={`/admin/stores/${store.id}/edit`}
          className="text-sm text-blue-500 hover:underline"
        >
          Edit
        </Link>
        <Link
          href={`/admin/stores/${store.id}/delete`}
          className="text-sm text-red-500 hover:underline"
        >
          Delete
        </Link>
      </CardContent>
    </Card>
  );
}
