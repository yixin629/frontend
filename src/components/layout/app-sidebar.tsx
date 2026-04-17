"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3, Box, HeadphonesIcon, LayoutDashboard, Megaphone,
  Package, Settings, ShoppingCart, Store,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/listings", label: "Listings", icon: Store },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/inventory", label: "Inventory", icon: Box },
  { href: "/dashboard/customer-service", label: "Customer Service", icon: HeadphonesIcon },
  { href: "/dashboard/marketing", label: "Marketing", icon: Megaphone },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 border-r bg-card flex flex-col h-full">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold tracking-tight">AutoBay</h1>
        <p className="text-xs text-muted-foreground mt-1">AI E-Commerce Platform</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t text-xs text-muted-foreground">AutoBay v0.1.0</div>
    </aside>
  );
}
