import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AddStoreModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (store: {
    name: string;
    location: string;
    ownerId: string;
    status: boolean;
    rating: number;
  }) => void;
}

export function AddStoreModal({ open, onClose, onSubmit }: AddStoreModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    ownerId: "",
    status: true,
    rating: 0,
  });
  const [owners, setOwners] = useState<User[]>([]);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        const storeOwners = data.filter((user: User) => 
          user.role === "OWNER" || user.role === "USER"
        );
        setOwners(storeOwners);
      } catch (error) {
        console.error('Failed to fetch owners:', error);
      }
    };

    fetchOwners();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Selected Owner ID:', formData.ownerId); // Add this line to debug
    
    if (!formData.ownerId) {
      alert('Please select a store owner');
      return;
    }
    
    onSubmit(formData);
    setFormData({ name: "", location: "", ownerId: "", status: true, rating: 0 });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Store</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Store Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="status">Store Status</Label>
              <Select
                value={formData.status.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value === "true" })
                }
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="rating">Initial Rating</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: parseFloat(e.target.value) })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="owner">Store Owner</Label>
              <Select
                value={formData.ownerId}
                onValueChange={(value) =>
                  setFormData({ ...formData, ownerId: value })
                }
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an owner" />
                </SelectTrigger>
                <SelectContent>
                  {owners.map((owner) => (
                    <SelectItem key={owner.id} value={owner.id}>
                      {owner.name} ({owner.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Store</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}