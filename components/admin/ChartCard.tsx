"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export type ChartCardProps = {
  title: string;
  value: number | string;
  change: string; // e.g. "5% increase"
  data: { name: string; value: number }[];
};

export function ChartCard({ title, value, change, data }: ChartCardProps) {
  return (
    <Card className="flex-1">
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>{title}</CardTitle>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">{change}</div>
        </div>
        {/* you could drop in a DropdownMenu here for the “…” */}
      </CardHeader>

      <CardContent className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.7)" }}/>
            <YAxis tick={{ fill: "rgba(255,255,255,0.7)" }}/>
            <Tooltip
              contentStyle={{ backgroundColor: "#1f1f1f", border: "none" }}
              itemStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f97316"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
