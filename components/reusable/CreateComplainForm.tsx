"use client";
import { Textarea } from "@/components/ui/textarea";
import { ComplaintSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import { createComplaint } from "@/actions/create-complaint";
import LoadingButton from "./loading-button";

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
									{...field}
									placeholder="Add new feature..."
									required
								/>
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
