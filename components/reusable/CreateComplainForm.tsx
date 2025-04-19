"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreateComplaintForm() {
  return (
    <form className="space-y-6 mt-8 w-full">
        <div className="flex flex-row gap-4 items-center justify-center w-full">

      <div className="w-full">
        <label className="block font-semibold mb-1">Name</label>
        <Input placeholder="Mohammad" required />
      </div>
      <div className="w-full">
        <label className="block font-semibold mb-1">Email</label>
        <Input placeholder="example@acme.com" type="text" required />
      </div>
        </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <Textarea placeholder="Add new feature..." required />
      </div>

      <div className="flex gap-4 mt-6">
        <Button type="submit" size={"lg"} className="w-full">Save</Button>
      </div>
    </form>
  );
}