"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, ShoppingCart, BarChart3 } from "lucide-react";

const stats = [
  { title: "Total Revenue", value: "$0.00", icon: DollarSign, sub: "All platforms combined" },
  { title: "Gross Profit", value: "$0.00", icon: TrendingUp, sub: "After COGS and fees" },
  { title: "Total Orders", value: "0", icon: ShoppingCart, sub: "This month" },
  { title: "AI Cost", value: "$0.00", icon: BarChart3, sub: "LLM API usage" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">Business intelligence and performance metrics</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.title}</CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Revenue by Platform</CardTitle></CardHeader>
          <CardContent className="h-64 flex items-center justify-center text-muted-foreground text-sm">
            Charts will appear once orders start flowing in.
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Top Products</CardTitle></CardHeader>
          <CardContent className="h-64 flex items-center justify-center text-muted-foreground text-sm">
            Product performance data will populate here.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
