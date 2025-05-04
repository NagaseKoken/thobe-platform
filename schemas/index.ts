import * as z from "zod";

export const LoginSchema = z.object({
	email: z.string().email({
		message: "Email is required",
	}),
	password: z.string().min(6, {
		message: "Password is required",
	}),
	code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
	email: z.string().email({
		message: "Email is required",
	}),

	password: z.string().min(6, {
		message: "Minimum 6 characters required",
	}),

	name: z.string().min(1, {
		message: "Name is required",
	}),
});

export const ResetSchema = z.object({
	email: z.string().email({
		message: "Email is required",
	}),
});

export const NewPasswordSchema = z.object({
	password: z.string().min(6, {
		message: "Minimum 6 characters required",
	}),
});

export const MeasurementsSchema = z.object({
	chest: z.coerce.number(),
	waist: z.coerce.number(),
	hips: z.coerce.number(),
	height: z.coerce.number(),
});

export const ComplaintSchema = z.object({
	description: z.string().min(1, {
		message: "Description is required",
	}),
});

export const ProductSchema = z.object({
	name: z.string().min(1, "Product name is required"),
	price: z.number().min(0, "Price must be a positive number"),
	fabricType: z.string().min(1, "Fabric type is required"),
	description: z.string().min(1, "Description is required"),
	image: z.string().optional(),
});
