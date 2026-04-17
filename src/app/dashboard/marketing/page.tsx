"use client";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api, type Campaign } from "@/lib/api";

const statusColor: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800", active: "bg-green-100 text-green-800",
  paused: "bg-yellow-100 text-yellow-800", completed: "bg-blue-100 text-blue-800",
};

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listCampaigns().then((d) => setCampaigns(d.items)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Marketing</h2>
          <p className="text-muted-foreground">AI-powered ad campaigns and SEO optimization</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" />New Campaign</Button>
      </div>
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : campaigns.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No campaigns yet. Create your first AI-powered campaign.</p>
            <div className="grid gap-3 md:grid-cols-3 max-w-2xl mx-auto">
              {["eBay Promoted Listings", "Amazon PPC", "Google Ads", "Facebook Ads", "TikTok Ads", "Social Media Posts"].map((type) => (
                <div key={type} className="rounded-lg border p-3 text-sm text-center hover:bg-accent cursor-pointer transition-colors">
                  {type}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((c) => (
            <Card key={c.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{c.name}</CardTitle>
                  <Badge variant="outline" className={statusColor[c.status] || ""}>{c.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground capitalize">{c.campaign_type.replace(/_/g, " ")}</p>
                  {c.budget_daily && <p>Budget: ${c.budget_daily}/day</p>}
                  {c.is_ai_generated && <Badge className="bg-purple-100 text-purple-800 text-xs">AI Generated</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
