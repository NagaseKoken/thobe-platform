import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, DollarSign, Clock, Tag } from "lucide-react";
import type { Product } from "@prisma/client";

interface ProductCardProps {
	product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
	const {
		name,
		price,
		description,
		type,
		material,
		image,
		available,
		created_at,
	} = product;

	return (
		<Card className="overflow-hidden">
			<div className="relative w-full h-48">
				{image ? (
					<Image
						src={image}
						alt={name}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				) : (
					<div className="w-full h-full bg-gray-100 flex items-center justify-center">
						<Package className="h-12 w-12 text-gray-400" />
					</div>
				)}
			</div>
			<CardHeader className="pb-2">
				<div className="flex justify-between items-center">
					<CardTitle className="text-lg">{name}</CardTitle>
					<Badge variant={available ? "default" : "destructive"}>
						{available ? "Available" : "Unavailable"}
					</Badge>
				</div>
				<p className="text-sm text-gray-500 line-clamp-2">{description}</p>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="flex justify-between items-center">
					<div className="flex items-center text-sm text-gray-500">
						<Tag className="h-4 w-4 mr-1" />
						{type} {material && `- ${material}`}
					</div>
					<div className="flex items-center text-sm font-medium">
						<DollarSign className="h-4 w-4" />
						{Number(price).toFixed(2)}
					</div>
				</div>
				<div className="flex items-center text-xs text-gray-400">
					<Clock className="h-3 w-3 mr-1" />
					Added {new Date(created_at).toLocaleDateString()}
				</div>
			</CardContent>
		</Card>
	);
}
