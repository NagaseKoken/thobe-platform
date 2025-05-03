"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/reusable/navbar";
import { Sidebar } from "@/components/admin/Sidebar";
import Footer from "@/components/reusable/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search } from "lucide-react";
import { Product, Order, Request } from "@/types";
import Link from "next/link";



export default function StoreDetailsPage() {
  const params = useParams();
  const [store, setStore] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState<"products" | "orders" | "requests">("products");

  useEffect(() => {
    // Fetch store details
    fetch(`/api/stores/${params.id}`)
      .then(res => res.json())
      .then(setStore)
      .catch(console.error);

    // Fetch store products
    fetch(`/api/stores/${params.id}/products`)
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);

    // Fetch store orders
    fetch(`/api/stores/${params.id}/orders`)
      .then(res => res.json())
      .then(setOrders)
      .catch(console.error);

    // Fetch store requests
    fetch(`/api/stores/${params.id}/requests`)
      .then(res => res.json())
      .then(setRequests)
      .catch(console.error);
  }, [params.id]);

  const filterItems = (items: any[]) => {
    return items.filter(item =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  if (!store) return <div>Loading...</div>;

  const filteredProducts = filterItems(products);
  const filteredOrders = filterItems(orders);
  const filteredRequests = filterItems(requests);

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
                  <Card key={product.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">Price: ${product.price}</p>
                      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                      <p className="text-sm text-gray-500">Status: {product.status}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {currentTab === "orders" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOrders.map(order => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{order.customerName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleDateString()}</p>
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
                      <p className="text-sm text-gray-500">Date: {new Date(request.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">Status: {request.status}</p>
                      <p className="text-sm text-gray-500">{request.description}</p>
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