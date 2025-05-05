import StoreDetailsPage from "@/components/admin/StoreIdContent";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	if (!id) {
		return new Response("Not found", { status: 404 });
	}
	return <StoreDetailsPage id={id} />;
}
