"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
	};

	return (
		<Form {...form}>
			<form
				className="space-y-6 mt-8"
				onSubmit={form.handleSubmit(onSubmit)} // Prevent default form submission and call handleSubmit
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="e.g., Kuwaiti Thobe" required />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<Input
									placeholder="e.g., 100 SR"
									type="number"
									required
									{...field}
									onChange={(e) => {
										const value = parseFloat(e.target.value);
										field.onChange(isNaN(value) ? 0 : value); // Ensure the value is a number
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="fabricType"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Fabric Type</FormLabel>
							<FormControl>
								<Input placeholder="e.g., Fabric 1" required {...field} />
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
									{...field}
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
								<Input type="file" {...field} accept="image/*" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-4 mt-6">
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
