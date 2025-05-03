"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
  
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
  
    const res = await fetch("/api/products", {
      method: "POST",
      body: formData,
    });
  
    let result;
    try {
      result = await res.json();
    } catch {
      result = { error: "No response body or invalid JSON." };
    }
  
    setLoading(false);
  
    if (!res.ok) {
      alert(result.error || "Something went wrong.");
    } else {
      alert("Product added!");
      form.reset();
    }
  }
  

  return (
    <form className="space-y-6 mt-8" encType="multipart/form-data" onSubmit={handleSubmit}>
      <div>
        <label className="block font-semibold mb-1">Name of the product</label>
        <Input
          name="name"
          placeholder="e.g., Kuwaiti Thobe"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Price</label>
        <Input
          name="price"
          type="number"
          placeholder="e.g., 100"
          min="1"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Fabric Type</label>
        <Input
          name="fabricType"
          placeholder="e.g., Cotton"
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <Textarea
          name="description"
          placeholder="e.g., A traditional Kuwaiti thobe crafted from premium lightweight cotton."
          required
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">
          Upload an Image of the new product & fabrics
        </label>
        <Input
          name="image"
          type="file"
          accept="image/png, image/jpeg"
          required
        />
      </div>

      <div className="flex gap-4 mt-6">
        <Button variant="outline" type="button">Cancel</Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}