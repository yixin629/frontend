"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api, type Product } from "@/lib/api";

const statusColor: Record<string, string> = {
  draft: "bg-yellow-100 text-yellow-800", active: "bg-green-100 text-green-800", archived: "bg-gray-100 text-gray-800",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listProducts({ limit: 50 }).then((d) => { setProducts(d.items); setTotal(d.total); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your product catalog ({total} total)</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" />Add Product</Button>
      </div>
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>SKU</TableHead><TableHead>Title</TableHead><TableHead>Category</TableHead>
            <TableHead>Sourcing</TableHead><TableHead>Cost</TableHead><TableHead>Status</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
            ) : products.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No products yet. Click &quot;Add Product&quot; to get started.</TableCell></TableRow>
            ) : products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-mono text-sm">{p.sku}</TableCell>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell>{p.category || "-"}</TableCell>
                <TableCell className="capitalize">{p.sourcing_mode.replace(/_/g, " ")}</TableCell>
                <TableCell>{p.base_cost ? `${p.base_cost_currency} ${p.base_cost}` : "-"}</TableCell>
                <TableCell><Badge variant="outline" className={statusColor[p.status] || ""}>{p.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
