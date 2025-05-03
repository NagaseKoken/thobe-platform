import { useState } from 'react';
import { UserRole } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (userData: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }) => Promise<void>;
}

export function AddUserModal({ open, onClose, onSubmit }: AddUserModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER" as UserRole
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(form);
      setForm({ name: "", email: "", password: "", role: "USER" as UserRole });
      onClose();
    } catch (error) {
      console.error('Failed to create user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input
                placeholder="Enter full name"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                disabled={isLoading}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <Input
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                disabled={isLoading}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                disabled={isLoading}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">User Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({...form, role: e.target.value as UserRole})}
                className="w-full p-2 border rounded-md"
                disabled={isLoading}
                required
              >
                <option value="USER">Customer</option>
                <option value="OWNER">Shop Owner</option>
                <option value="WORKER">Worker</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create User'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}