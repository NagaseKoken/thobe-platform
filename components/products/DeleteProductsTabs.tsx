"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProduct } from "@/actions/delete-product";
import { toast } from "sonner";
import { queryClient } from "../reusable/provider";
import LoadingButton from "../reusable/loading-button";
import { useState } from "react";
import { getProducts } from "@/actions/queries";

export default function DeleteProductsTabs() {
	const [beingDeleted, setBeingDeleted] = useState<string | null>(null);
	const {
		data: ps,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["products"],
		queryFn: getProducts,
	});
	const { mutate: deleteItem, isPending: mutationPending } = useMutation({
		mutationFn: async (id: string) => {
			setBeingDeleted(id);
			const deletedProduct = await deleteProduct(id);
			return deletedProduct;
		},
		onSuccess: () => {
			setBeingDeleted(null);
			toast.success("Product deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (error) => {
			setBeingDeleted(null);
			toast.error(error.message);
		},
	});

	if (isPending) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error loading products</div>;
	}
	if (!ps || ps.length === 0) {
		return <div>No products found</div>;
	}

	return (
		<Tabs defaultValue="fabrics" className="w-full my-5">
			{/* Tab Triggers */}
			<TabsList aria-label="Order Tabs" className="w-max-md">
				<TabsTrigger value="fabrics">Fabrics</TabsTrigger>

				<TabsTrigger value="products">Products</TabsTrigger>
			</TabsList>

			{/* Tab Content */}
			<TabsContent value="fabrics">
				<div className="flex flex-col gap-4">
					{ps.filter((p) => p.type === "fabric").length === 0 && (
						<span className="text-muted-foreground">No fabrics available</span>
					)}
					{ps
						.filter((p) => p.type === "fabric")
						.map((fabric) => {
							return (
								<div
									key={fabric.id}
									className="flex flex-row justify-between items-center border-b border-muted-foreground py-2"
								>
									<span>{fabric.name}</span>
									<LoadingButton
										type="button"
										disabled={mutationPending}
										className="cursor-pointer"
										variant={"destructive"}
										onClick={() => deleteItem(fabric.id)}
										pending={mutationPending && beingDeleted === fabric.id}
									>
										{" "}
										Delete
									</LoadingButton>
								</div>
							);
						})}
				</div>
			</TabsContent>

			<TabsContent value="products">
				<div className="flex flex-col gap-4">
					{ps.filter((p) => p.type === "product").length === 0 && (
						<span className="text-muted-foreground">No products available</span>
					)}
					{ps
						.filter((p) => p.type === "product")
						.map((product) => {
							return (
								<div
									key={product.id}
									className="flex flex-row justify-between items-center border-b border-muted-foreground py-2"
								>
									<span>{product.name}</span>
									<LoadingButton
										className="cursor-pointer"
										variant={"destructive"}
										type="button"
										disabled={mutationPending}
										onClick={() => deleteItem(product.id)}
										pending={mutationPending && beingDeleted === product.id}
									>
										Delete
									</LoadingButton>
								</div>
							);
						})}
				</div>
			</TabsContent>
		</Tabs>
	);
}
