import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const platforms = [
  { name: "eBay", description: "Connect your eBay seller account (AU, US, UK)", regions: ["AU", "US", "UK"] },
  { name: "Amazon", description: "Connect Amazon Seller Central via SP-API", regions: ["US", "UK", "AU"] },
  { name: "Shopify", description: "Connect your Shopify store (GraphQL Admin API)", regions: ["Global"] },
  { name: "TikTok Shop", description: "Connect TikTok Shop seller account", regions: ["AU", "US", "UK"] },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Connect platforms and configure your AutoBay instance</p>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Platform Connections</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {platforms.map((p) => (
            <Card key={p.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{p.name}</CardTitle>
                  <Badge variant="outline">Not Connected</Badge>
                </div>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {p.regions.map((r) => <Badge key={r} variant="secondary" className="text-xs">{r}</Badge>)}
                  </div>
                  <Button size="sm">Connect</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">AI Configuration</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">LLM API Keys</CardTitle>
            <CardDescription>Configure API keys for AI features (listing generation, customer service, marketing)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Anthropic (Claude)</span>
                <Badge variant="outline">Not configured</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>OpenAI</span>
                <Badge variant="outline">Not configured</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
