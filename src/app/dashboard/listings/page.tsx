"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api, type Listing } from "@/lib/api";

const statusColor: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800", pending: "bg-yellow-100 text-yellow-800",
  active: "bg-green-100 text-green-800", paused: "bg-orange-100 text-orange-800",
  error: "bg-red-100 text-red-800", ended: "bg-gray-100 text-gray-800",
};

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listListings().then((d) => { setListings(d.items); setTotal(d.total); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Listings</h2>
        <p className="text-muted-foreground">Cross-platform listing management ({total} total)</p>
      </div>
      <Card><CardContent className="p-0">
        <Table>
          <TableHeader><TableRow>
            <TableHead>Title</TableHead><TableHead>Platform</TableHead><TableHead>Region</TableHead>
            <TableHead>Price</TableHead><TableHead>Status</TableHead><TableHead>External ID</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
            ) : listings.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No listings yet. Create a product and publish it to a platform.</TableCell></TableRow>
            ) : listings.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="font-medium">{l.title || "(uses product title)"}</TableCell>
                <TableCell className="capitalize">{l.platform}</TableCell>
                <TableCell>{l.region}</TableCell>
                <TableCell>{l.price ? `${l.currency} ${Number(l.price).toFixed(2)}` : "-"}</TableCell>
                <TableCell><Badge variant="outline" className={statusColor[l.status] || ""}>{l.status}</Badge></TableCell>
                <TableCell className="font-mono text-xs">{l.external_listing_id || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent></Card>
    </div>
  );
}
