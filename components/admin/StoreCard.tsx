import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Store as StoreIcon, MapPin, Star, Package } from "lucide-react";
import type { Store } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteStore, getStoreProducts } from "@/actions/store-actions";
import { queryClient } from "../reusable/provider";
import { toast } from "sonner";

interface StoreCardProps {
	store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
	// const [products, setProducts] = useState<Product[]>([]);

	const { data: products, isPending: isLoading } = useQuery({
		queryKey: ["products", store.id],
		queryFn: () => getStoreProducts(store.id),
	});
	// useEffect(() => {
	// 	async function loadProducts() {
	// 		const res = await fetch(`/api/stores/${store.id}/products`);
	// 		if (!res.ok) throw new Error("Failed to fetch products");
	// 		setProducts(await res.json());
	// 	}
	// 	loadProducts();
	// }, [store.id]);

	const { id, name, location, rating, status } = store;

	const { mutate } = useMutation({
		mutationKey: ["delte-store"],
		mutationFn: () => deleteStore(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["stores"] });
			toast.success("Store removed successfully!");
		},
		onError: (err) => {
			console.error(err);
			toast.error("Failed to remove store");
		},
	});

	const handleRemove = async () => {
		if (!confirm("Remove this store?")) return;
		// 	const res = await fetch(`/api/stores/${id}`, { method: "DELETE" });
		// 	if (!res.ok) console.error("Failed to remove store:", await res.text());
		await mutate();
	};
	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-lg">Loading...</div>
			</div>
		);
	}
	return (
		<div className="p-6 bg-white rounded-lg shadow border space-y-4">
			{/* Store Image */}
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                {store.image ? (
                    <Image
                        src={store.image}
                        alt={`${store.name} store`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    // Fallback image or placeholder
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <StoreIcon className="h-12 w-12 text-gray-400" />
                    </div>
                )}
            </div>
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
				<Badge variant={status ? "default" : "destructive"}>
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
					{products?.length} products
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
