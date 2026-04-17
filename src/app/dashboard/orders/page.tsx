"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api, type Order } from "@/lib/api";

const statusColor: Record<string, string> = {
  new: "bg-blue-100 text-blue-800", processing: "bg-yellow-100 text-yellow-800",
  shipped: "bg-purple-100 text-purple-800", delivered: "bg-green-100 text-green-800",
  completed: "bg-green-100 text-green-800", cancelled: "bg-red-100 text-red-800",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listOrders({ limit: 50 }).then((d) => { setOrders(d.items); setTotal(d.total); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
        <p className="text-muted-foreground">Unified order management across all platforms ({total} total)</p>
      </div>
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Order ID</TableHead><TableHead>Platform</TableHead><TableHead>Customer</TableHead>
            <TableHead>Total</TableHead><TableHead>Payment</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
            ) : orders.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No orders yet. Orders sync automatically once platforms are connected.</TableCell></TableRow>
            ) : orders.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-mono text-sm">{o.external_order_id || o.id.slice(0, 8)}</TableCell>
                <TableCell>{o.platform ? <Badge variant="outline">{o.platform} {o.region}</Badge> : "-"}</TableCell>
                <TableCell>{o.customer_name || "-"}</TableCell>
                <TableCell className="font-medium">{o.currency} {Number(o.total).toFixed(2)}</TableCell>
                <TableCell><Badge variant="outline" className={o.payment_status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>{o.payment_status}</Badge></TableCell>
                <TableCell><Badge variant="outline" className={statusColor[o.status] || ""}>{o.status}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{o.ordered_at ? new Date(o.ordered_at).toLocaleDateString() : "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
