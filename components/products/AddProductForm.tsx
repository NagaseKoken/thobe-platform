"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function AddProductForm() {
  return (
    <form className="space-y-6 mt-8">
      <div>
        <label className="block font-semibold mb-1">Name of the product</label>
        <Input placeholder="e.g., Kuwaiti Thobe" required />
      </div>

      <div>
        <label className="block font-semibold mb-1">Price</label>
        <Input placeholder="e.g., 100 SR" type="number" required />
      </div>

      <div>
        <label className="block font-semibold mb-1">Fabric Type</label>
        <Input placeholder="e.g., Fabric 1" required />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <Textarea placeholder="e.g., A traditional Kuwaiti thobe crafted from premium lightweight cotton." required />
      </div>

      <div>
        <label className="block font-semibold mb-1">
          Upload an Image of the new product & fabrics
        </label>
        <Button variant="outline" className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload
        </Button>
      </div>

      <div className="flex gap-4 mt-6">
        <Button variant="outline" type="button">Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}