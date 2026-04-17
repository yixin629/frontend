const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    if (typeof window !== "undefined") localStorage.setItem("autobay_token", token);
  }

  getToken(): string | null {
    if (this.token) return this.token;
    if (typeof window !== "undefined") this.token = localStorage.getItem("autobay_token");
    return this.token;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== "undefined") localStorage.removeItem("autobay_token");
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE}${path}`, { ...options, headers });

    if (response.status === 401) {
      this.clearToken();
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: "Request failed" }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }
    if (response.status === 204) return {} as T;
    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    const data = await this.request<{ access_token: string; refresh_token: string }>("/auth/login", {
      method: "POST", body: JSON.stringify({ email, password }),
    });
    this.setToken(data.access_token);
    return data;
  }

  async register(email: string, password: string, fullName?: string) {
    return this.request("/auth/register", {
      method: "POST", body: JSON.stringify({ email, password, full_name: fullName }),
    });
  }

  async getMe() {
    return this.request<{ id: string; email: string; full_name: string; role: string }>("/auth/me");
  }

  // Products
  async listProducts(params?: { offset?: number; limit?: number; status?: string }) {
    const q = new URLSearchParams();
    if (params?.offset) q.set("offset", String(params.offset));
    if (params?.limit) q.set("limit", String(params.limit));
    if (params?.status) q.set("status", params.status);
    return this.request<{ items: Product[]; total: number }>(`/products/?${q}`);
  }
  async getProduct(id: string) { return this.request<Product>(`/products/${id}`); }
  async createProduct(data: Partial<Product>) {
    return this.request<Product>("/products/", { method: "POST", body: JSON.stringify(data) });
  }
  async updateProduct(id: string, data: Partial<Product>) {
    return this.request<Product>(`/products/${id}`, { method: "PATCH", body: JSON.stringify(data) });
  }
  async deleteProduct(id: string) { return this.request(`/products/${id}`, { method: "DELETE" }); }

  // Orders
  async listOrders(params?: { offset?: number; limit?: number; status?: string; platform?: string }) {
    const q = new URLSearchParams();
    if (params?.offset) q.set("offset", String(params.offset));
    if (params?.limit) q.set("limit", String(params.limit));
    if (params?.status) q.set("status", params.status);
    if (params?.platform) q.set("platform", params.platform);
    return this.request<{ items: Order[]; total: number }>(`/orders/?${q}`);
  }
  async getOrder(id: string) { return this.request<Order>(`/orders/${id}`); }

  // Listings
  async listListings(params?: { product_id?: string; platform?: string; status?: string }) {
    const q = new URLSearchParams();
    if (params?.product_id) q.set("product_id", params.product_id);
    if (params?.platform) q.set("platform", params.platform);
    if (params?.status) q.set("status", params.status);
    return this.request<{ items: Listing[]; total: number }>(`/listings/?${q}`);
  }

  // Inventory
  async getProductStock(productId: string) {
    return this.request<InventoryItem[]>(`/inventory/products/${productId}`);
  }
  async adjustStock(data: { product_id: string; location_id: string; quantity_change: number; movement_type: string; notes?: string }) {
    return this.request<InventoryItem>("/inventory/adjust", { method: "POST", body: JSON.stringify(data) });
  }
  async listLocations() { return this.request<Location[]>("/inventory/locations"); }

  // Pricing
  async calculatePrice(data: { base_cost: number; cost_currency: string; target_currency: string; margin_pct: number; platform: string }) {
    return this.request<PriceCalculation>("/pricing/calculate", { method: "POST", body: JSON.stringify(data) });
  }

  // Marketing
  async listCampaigns() { return this.request<{ items: Campaign[]; total: number }>("/marketing/campaigns"); }
  async createCampaign(data: { name: string; campaign_type: string; budget_daily?: number }) {
    return this.request<Campaign>("/marketing/campaigns", { method: "POST", body: JSON.stringify(data) });
  }

  // Customer Service
  async listMessages(params?: { requires_human?: boolean }) {
    const q = new URLSearchParams();
    if (params?.requires_human !== undefined) q.set("requires_human", String(params.requires_human));
    return this.request<{ items: Message[]; total: number }>(`/customer-service/messages?${q}`);
  }
}

export const api = new ApiClient();

// Types
export interface Product {
  id: string; sku: string; title: string; description: string | null; category: string | null;
  brand: string | null; images: { url: string; position: number; alt_text: string }[];
  attributes: Record<string, string>; sourcing_mode: string; base_cost: number | null;
  base_cost_currency: string; status: string; created_at: string; updated_at: string;
}
export interface Order {
  id: string; platform: string | null; region: string | null; external_order_id: string | null;
  status: string; customer_name: string | null; total: number; currency: string;
  payment_status: string; ordered_at: string | null; created_at: string;
}
export interface Listing {
  id: string; product_id: string; platform: string; region: string; status: string;
  title: string | null; price: number | null; currency: string; external_listing_id: string | null;
  created_at: string;
}
export interface InventoryItem {
  id: string; product_id: string; location_id: string; quantity_on_hand: number;
  quantity_reserved: number; quantity_available: number;
}
export interface Location { id: string; name: string; country: string | null; location_type: string; }
export interface PriceCalculation {
  suggested_price: number; exchange_rate: number; cost_in_target: number; estimated_profit: number;
}
export interface Campaign {
  id: string; name: string; campaign_type: string; status: string; budget_daily: number | null;
  ad_copy: Record<string, unknown>; keywords: string[]; is_ai_generated: boolean;
}
export interface Message {
  id: string; platform: string; direction: string; sender: string | null; body: string;
  intent: string; is_ai_generated: boolean; ai_confidence: number | null;
  requires_human: boolean; ai_draft_response: string | null;
}
