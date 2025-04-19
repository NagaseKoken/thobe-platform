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
  change: string;
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
      </CardHeader>

      <CardContent className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="name" 
              stroke="#888888"
              fontSize={12}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: "#1f1f1f", 
                border: "none",
                borderRadius: "4px",
                padding: "8px"
              }}
              itemStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#f97316"
              strokeWidth={2}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}