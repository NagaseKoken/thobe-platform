"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FormSuccess } from "@/components/auth/form-success";
import { FormError } from "@/components/auth/form-error";
import { RegisterSchema } from "@/schemas/index";
import LoadingButton from "../reusable/loading-button";
import authClient from "@/lib/auth-cilent";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
	});
	const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
		const res = await authClient.signUp.email({
			email: values.email,
			password: values.password,
			name: values.name,
		});

		if (res.error) {
			toast.error("Error Signing Up");
			return;
		}
		toast.success("Signed Up Successfully");
		const role = "USER";
		if (role === "USER") {
			router.push("/home");
			return;
		}
		if (role === "ADMIN") {
			router.push("/admin");
			return;
		}
		if (role === "WORKER") {
			router.push("/worker");
			return;
		}
		if (role === "OWNER") {
			router.push("/owner");
			return;
		}

		// setError("")
		// setSuccess("")

		// startTransition(() => {
		//     register(values)
		//     .then((data) => {
		//         setError(data.error)
		//         setSuccess(data.success)
		//     })
		// })
	};
	return (
		<CardWrapper
			headerLabel="Create an account"
			backButtonHref="/auth/login"
			backButtonLabel="Already have an account"
			showSocial
		>
			<Form {...form}>
				<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="John Deo"
											type="name"
											disabled={form.formState.isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="john.deo@example.com"
											type="email"
											disabled={form.formState.isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="******"
											type="password"
											disabled={form.formState.isSubmitting}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={"error"} />
					<FormSuccess message={"success"} />
					<LoadingButton
						type="submit"
						pending={form.formState.isSubmitting}
						className="w-full cursor-pointer"
						disabled={form.formState.isSubmitting || !form.formState.isValid}
					>
						Create an account
					</LoadingButton>
				</form>
			</Form>
		</CardWrapper>
	);
};
