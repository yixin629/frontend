import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, ShoppingCart, Store, DollarSign } from "lucide-react";

const stats = [
  { title: "Total Products", value: "0", icon: Package, sub: "Phase 1" },
  { title: "Active Listings", value: "0", icon: Store, sub: "Across all platforms" },
  { title: "Orders Today", value: "0", icon: ShoppingCart, sub: "Synced automatically" },
  { title: "Revenue (MTD)", value: "$0.00", icon: DollarSign, sub: "All currencies" },
];

const platforms = [
  { name: "eBay AU", region: "AU" }, { name: "Amazon US", region: "US" },
  { name: "Shopify", region: "Global" }, { name: "TikTok Shop", region: "AU" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your cross-border e-commerce operations</p>
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
      <Card>
        <CardHeader><CardTitle>Platform Connections</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {platforms.map((p) => (
              <div key={p.name} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="font-medium text-sm">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.region}</p>
                </div>
                <Badge variant="outline" className="text-xs">Not Connected</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No orders yet. Connect a platform to start syncing orders.</p>
        </CardContent>
      </Card>
    </div>
  );
}
