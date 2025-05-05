"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/schemas";
import { FormSuccess } from "@/components/auth/form-success";
import { FormError } from "@/components/auth/form-error";
import LoadingButton from "../reusable/loading-button";
import authClient from "@/lib/auth-cilent";
import { toast } from "sonner";

export const LoginForm = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		const res = await authClient.signIn.email({
			email: values.email,
			password: values.password,
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

		// startTransition( ()=>{
		//     login(values)
		//     .then((data)=>{
		//         if(data?.error){
		//             form.reset()
		//             setError(data.error)
		//         }
		//         if(data?.success){
		//             form.reset()
		//             setError(data.success)
		//         }
		//         // if(data?.twoFactor){
		//         //     setShowTwoFactor(true)
		//         // }
		//     })
		//     .catch(()=> setError("Something went wrong"))
		// })
	};
	return (
		<CardWrapper
			headerLabel="Welcome back!"
			backButtonLabel="Don't have an account?"
			backButtonHref="/auth/register"
			showSocial
		>
			<Form {...form}>
				<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="space-y-4">
						{/* {showTwoFactor && (
                            <FormField control={form.control} name='code' render={({field}) => (
                                <FormItem>
                                    <FormLabel>Two Factor Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='123456' type='code' disabled={isPending}/>
                                    </FormControl>
                                </FormItem>
                            )}/>
                        )} */}

						<>
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
										<Button
											size="sm"
											variant="link"
											asChild
											className="px-0 font-normal"
										>
											<Link href="/auth/reset">Forgot password?</Link>
										</Button>
										<FormMessage />
									</FormItem>
								)}
							/>
						</>
					</div>
					<FormError message={"error"} />
					<FormSuccess message={"success"} />
					<LoadingButton
						pending={form.formState.isSubmitting}
						type="submit"
						className="w-full cursor-pointer"
						disabled={form.formState.isSubmitting || !form.formState.isValid}
					>
						Login{" "}
					</LoadingButton>
				</form>
			</Form>
		</CardWrapper>
	);
};
