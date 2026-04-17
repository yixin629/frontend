"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Box, AlertTriangle, TrendingDown, Package } from "lucide-react";

const stats = [
  { title: "Total SKUs", value: "0", icon: Package },
  { title: "Low Stock Alerts", value: "0", icon: AlertTriangle },
  { title: "Out of Stock", value: "0", icon: TrendingDown },
  { title: "Warehouse Locations", value: "0", icon: Box },
];

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Inventory</h2>
        <p className="text-muted-foreground">Central stock management across all warehouses</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s.title}</CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{s.value}</div></CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Stock by Product</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Add products and warehouse locations to start tracking inventory.
            Stock levels sync automatically across all connected platforms.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
