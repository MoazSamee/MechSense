"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { AlertTriangle, BarChart3, Battery, Bell, Calendar, Car, Droplets, Gauge, Home, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
    },
    {
      title: "Vehicle Health",
      icon: Car,
      href: "/vehicle-health",
    },
    {
      title: "Fault Detection",
      icon: AlertTriangle,
      href: "/fault-detection",
    },
    {
      title: "Maintenance",
      icon: Calendar,
      href: "/maintenance",
    },
    {
      title: "Battery Health",
      icon: Battery,
      href: "/battery-health",
    },
    {
      title: "Tire Pressure",
      icon: Gauge,
      href: "/tire-pressure",
    },
    {
      title: "Trip History",
      icon: BarChart3,
      href: "/trip-history",
    },
    {
      title: "Fuel Consumption",
      icon: Droplets,
      href: "/fuel-consumption",
    },
    {
      title: "Notifications",
      icon: Bell,
      href: "/notifications",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 px-2">
          <Car className="h-6 w-6" />
          <span className="font-bold">AutoMonitor</span>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between p-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/settings">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

