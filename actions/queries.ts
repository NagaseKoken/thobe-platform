"use server";
import { db } from "@/lib/db";

export const getProducts = async () => {
	const products = db.product.findMany();
	return products;
};
