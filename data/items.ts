import { db } from "@/lib/db";

export const getItemsById = async (storeId: string) => {
    try {
        const items = await db.product.findMany({
            where: {
                storeId: storeId
            },
            select: {
                id: true,
                storeId: true,
                name: true,
                description: true,
                price: true,
                type: true,
                material: true,
                image: true,
                available: true,
                created_at: true
            }
        });

        // Convert Decimal to string/number before sending to client
        return items
    } catch {
        null
    }
};

export const getItemById = async (id: string, storeId: string) => {
    try {
        const item = db.product.findUnique({
            where: {
                id: id,
                storeId: storeId,
            },
            select: {
                id: true,
                storeId: true,
                name: true,
                description: true,
                price: true,
                type: true,
                material: true,
                image: true,
                available: true,
                created_at: true,
            },
        });
        return item;
    } catch {
        return null;
    }
};

