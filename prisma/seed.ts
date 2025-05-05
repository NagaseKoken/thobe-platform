// // import { db } from "./db";
// import { PrismaClient } from "@prisma/client";
// const db = new PrismaClient({})

// const seedStore = async () => {
// 	const userId = "NH8qZxH8fdANqVV0aVEwnDihBt79EU8N";
// 	const store = await db.store.create({
// 		data: {
// 			name: "My Store",
// 			ownerId: userId,
// 			location: "This is my store",
// 			status: true,
// 			rating: 4,
// 			created_at: new Date(),
// 			image: "https://example.com/image.jpg",
// 		},
// 	});
// 	const storeId = store.id;
// 	const productsData = [
// 		{
// 			name: "fabric 1",
// 			description: "Description for Product 1",
// 			price: 100,
// 			available: true,
// 			type: "fabric",
// 			storeId: storeId,
// 			image: "https://example.com/image1.jpg",
// 			created_at: new Date(),
// 		},
// 		{
// 			name: "Product 2",
// 			description: "Description for Product 2",
// 			price: 200,
// 			available: true,
// 			type: "product",
// 			storeId: storeId,
// 			image: "https://example.com/image1.jpg",
// 			created_at: new Date(),
// 		},
// 	];

// 	const createdProducts = [];

// 	for (const productData of productsData) {
// 		const product = await db.product.create({
// 			data: productData,
// 		});
// 		createdProducts.push(product);
// 	}

// 	console.log("Products created:", createdProducts);
// 	const productId = createdProducts[1].id;
// 	const fabricId = createdProducts[0].id;
// 	// name: "Product 1",
// 	// 					description: "Description for Product 1",
// 	// 					price: 100,
// 	// 					available: true,
// 	// 					type: "fabric",
// 	console.log("Store seeded:", store);
// 	const order = await db.order.create({
// 		data: {
// 			customerId: "MH8qZxH8fdANqVV0aVEwnDihBt79EU8N",
// 			storeId: storeId,
// 			status: "In Production",
// 			total: 100,
// 			created_at: new Date(),
// 		},
// 	});
// 	const orderId = order.id;
// 	const orderItem = await db.orderedItems.createMany({
// 		data: [
// 			{
// 				orderId: orderId,
// 				productId: productId,
// 				quantity: 2,
// 				price: 100,
// 			},
// 			{
// 				orderId: orderId,
// 				productId: fabricId,
// 				quantity: 1,
// 				price: 101,
// 			},
// 		],
// 	});
// 	console.log("Order seeded:", order);
// };
// seedStore().then(() => {
// 	console.log("Seeding completed successfully.");
// 	process.exit(0);
// }
// ).catch((error) => {
// 	console.error("Error seeding the database:", error);
// 	process.exit(1);
// }
// );
// // seedStore().then(() => {
