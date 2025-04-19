import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatCardProps {
  title: string;
  value: number | string;
  variant?: "default" | "secondary" | "destructive" | "outline" | "success"
}

export function StatCard({ title, value, variant = "default" }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{title}</CardTitle>
        <Badge variant={variant}>{value}</Badge>
      </CardHeader>
    </Card>
  );
}