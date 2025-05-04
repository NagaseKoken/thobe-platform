"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { ProductSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import LoadingButton from "../reusable/loading-button";
import { addProduct } from "@/actions/add-product";
import { toast } from "sonner";

export default function AddProductForm() {
	const form = useForm<z.infer<typeof ProductSchema>>({
		resolver: zodResolver(ProductSchema),
		defaultValues: {
			name: "",
			price: 0,
			fabricType: "",
			description: "",
			image: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof ProductSchema>) => {
		try {
			await addProduct(data);
			toast.success("Product added successfully!");
			form.reset();
		} catch (error) {
			console.error("Error adding product:", error);
			toast.error(error as string);
		}
		// Handle form submission logic here, e.g., send data to an API
	};

	return (
		<Form {...form}>
			<form
				className="space-y-6 mt-8"
				onSubmit={() => form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input
									onChange={field.onChange}
									value={field.value}
									placeholder="e.g., Kuwaiti Thobe"
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<Input
									placeholder="e.g., 100 SR"
									type="number"
									required
									onChange={field.onChange}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Fabric Type</FormLabel>
							<FormControl>
								<Input
									placeholder="e.g., Fabric 1"
									required
									onChange={field.onChange}
									value={field.value}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									onChange={field.onChange}
									placeholder="e.g., A traditional Kuwaiti thobe crafted from premium lightweight cotton."
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Image</FormLabel>
							<FormControl>
								<Input
									type="file"
									onChange={field.onChange}
									accept="image/*"
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-4 mt-6">
					<Button variant="outline" type="button">
						Cancel
					</Button>
					<LoadingButton
						type="submit"
						pending={form.formState.isSubmitting}
						disabled={form.formState.isSubmitting || !form.formState.isValid}
					>
						Save
					</LoadingButton>
				</div>
			</form>
		</Form>
	);
}
