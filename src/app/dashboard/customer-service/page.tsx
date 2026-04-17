"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeadphonesIcon, Bot, User, AlertCircle } from "lucide-react";
import { api, type Message } from "@/lib/api";

export default function CustomerServicePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.listMessages().then((d) => { setMessages(d.items); setTotal(d.total); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const needsHuman = messages.filter((m) => m.requires_human).length;
  const aiHandled = messages.filter((m) => m.is_ai_generated).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Customer Service</h2>
        <p className="text-muted-foreground">AI-powered customer support inbox</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Messages</CardTitle>
            <HeadphonesIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{total}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Handled</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">{aiHandled}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Needs Human Review</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold text-orange-600">{needsHuman}</div></CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Message Inbox</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : messages.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No customer messages yet. Messages from eBay, Amazon, Shopify, and TikTok Shop
              will appear here once platforms are connected. AI will auto-classify and draft responses.
            </p>
          ) : (
            <div className="space-y-3">
              {messages.map((m) => (
                <div key={m.id} className="flex items-start gap-3 rounded-lg border p-3">
                  {m.direction === "inbound" ? <User className="h-5 w-5 mt-0.5 text-blue-500" /> : <Bot className="h-5 w-5 mt-0.5 text-green-500" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{m.sender || "Customer"}</span>
                      <Badge variant="outline" className="text-xs">{m.platform}</Badge>
                      <Badge variant="outline" className="text-xs">{m.intent}</Badge>
                      {m.requires_human && <Badge className="bg-orange-100 text-orange-800 text-xs">Needs Review</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 truncate">{m.body}</p>
                    {m.ai_draft_response && (
                      <p className="text-xs text-green-700 mt-1 truncate">AI Draft: {m.ai_draft_response}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
