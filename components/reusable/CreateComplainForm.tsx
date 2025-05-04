"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ComplaintSchema } from "@/schemas";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import authClient from "@/lib/auth-cilent";
import { z } from "zod";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import { createComplaint } from "@/actions/create-complaint";

export default function CreateComplaintForm() {
	const form = useForm<z.infer<typeof ComplaintSchema>>({
		resolver: zodResolver(ComplaintSchema),
		defaultValues: {
			description: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof ComplaintSchema>) => {
		try {
			await createComplaint(values);
			toast.success("Complaint Created Successfully");
			form.reset();
		} catch (error) {
			toast.error("Error Creating Complaint");
		}
	};

	return (
		<Form {...form}>
			<form
				className="space-y-6 mt-8 w-full"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									onChange={field.onChange}
									placeholder="Add new feature..."
									required
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div>
					<label className="block font-semibold mb-1">Description</label>
				</div>

				<div className="flex gap-4 mt-6">
					<Button type="submit" size={"lg"} className="w-full">
						Save
					</Button>
				</div>
			</form>
		</Form>
	);
}
