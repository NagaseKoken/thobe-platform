"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/reusable/navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import Footer from "@/components/reusable/Footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import { Product, Order, Request } from "@prisma/client";
import { ProductCard } from "@/components/admin/ProductCard";
import Link from "next/link";

interface Store {
  id: string;
  name: string;
  location: string;
  status: boolean;
  rating: number;
  ownerId: string;
  image?: string;
  created_at: Date;
}

interface OrderWithUser extends Order {
  user?: { name?: string | null };
}

export default function StoreDetailsPage() {
  const params = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<OrderWithUser[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState<"products" | "orders" | "requests">("products");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStoreData() {
      setIsLoading(true);
      setError(null);

      try {
        const [storeRes, productsRes, ordersRes, requestsRes] = await Promise.all([
          fetch(`/api/stores/${params.id}`),
          fetch(`/api/stores/${params.id}/products`),
          fetch(`/api/stores/${params.id}/orders?includeUser=true`), // see note below
          fetch(`/api/stores/${params.id}/requests`)
        ]);

        if (!storeRes.ok) {
          throw new Error('Failed to fetch store details');
        }

        const [storeData, productsData, ordersData, requestsData] = await Promise.all([
          storeRes.json(),
          productsRes.ok ? productsRes.json() : [],
          ordersRes.ok ? ordersRes.json() : [],
          requestsRes.ok ? requestsRes.json() : []
        ]);

        setStore(storeData);
        setProducts(productsData);
        setOrders(ordersData);
        setRequests(requestsData);
      } catch (err) {
        console.error('Failed to fetch store data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load store data');
      } finally {
        setIsLoading(false);
      }
    }

    if (params.id) {
      fetchStoreData();
    }
  }, [params.id]);

  const filterItems = <T extends { name?: string; type?: string; status?: string }>(
    items: T[]
  ): T[] => {
    const query = searchQuery.toLowerCase();
    return items.filter(item =>
      item.name?.toLowerCase().includes(query) ||
      // @ts-ignore
      item.user?.name?.toLowerCase().includes(query) ||
      item.type?.toLowerCase().includes(query) ||
      item.status?.toLowerCase().includes(query)
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Store not found</div>
      </div>
    );
  }

  const filteredProducts = filterItems<Product>(products);
  const filteredOrders = filterItems<OrderWithUser>(orders);
  const filteredRequests = filterItems<Request>(requests);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/stores">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">{store.name}</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{products.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{orders.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{requests.length}</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Tabs value={currentTab} onValueChange={(v) => setCurrentTab(v as any)} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="requests">Requests</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-4">
            {currentTab === "products" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {currentTab === "orders" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOrders.map(order => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        {order.user?.name || "Unknown Customer"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Date: {new Date(order.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">Total: ${order.total}</p>
                      <p className="text-sm text-gray-500">Status: {order.status}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {currentTab === "requests" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRequests.map(request => (
                  <Card key={request.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{request.type}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Date: {new Date(request.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">Status: {request.status}</p>
                      {/* No description field in your schema */}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}