
import Link from "next/link"
import { AlertTriangle, Battery, BatteryCharging, Car, Droplets, Gauge, MoreHorizontal, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusCard } from "@/components/status-card"
import { NotificationBell } from "@/components/notification-bell"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  return (
    <div className="flex flex-col ml-60">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="ml-auto flex items-center gap-4">
          <NotificationBell />
        </div>
      </header>
      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatusCard
            title="Engine Status"
            value="Normal"
            icon={<Car className="h-4 w-4" />}
            status="normal"
            footer="Last checked: 5 minutes ago"
          />
          <StatusCard
            title="Fuel Level"
            value="68%"
            icon={<Droplets className="h-4 w-4" />}
            status="normal"
            footer={
              <div className="mt-2">
                <Progress value={68} className="h-2" />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Range: ~280 miles</span>
                  <span>12.5 gal</span>
                </div>
              </div>
            }
          />
          <StatusCard
            title="Battery Health"
            value="12.8V"
            icon={<Battery className="h-4 w-4" />}
            status="normal"
            footer="Good condition"
          />
          <StatusCard
            title="Tire Pressure"
            value="Low"
            icon={<Gauge className="h-4 w-4" />}
            status="warning"
            footer="Front left: 26 PSI (Low)"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="rounded-full bg-amber-500/20 p-2 text-amber-500">
                    <Gauge className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Low Tire Pressure</h3>
                    <p className="text-sm text-muted-foreground">Front left tire pressure is low (26 PSI)</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/tire-pressure">View</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="rounded-full bg-blue-500/20 p-2 text-blue-500">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Oil Change Due</h3>
                    <p className="text-sm text-muted-foreground">Scheduled maintenance: Oil change due in 500 miles</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/maintenance">View</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="rounded-full bg-destructive/20 p-2 text-destructive">
                    <Battery className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Battery Warning</h3>
                    <p className="text-sm text-muted-foreground">Battery voltage is low (11.8V)</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/battery-health">View</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-auto flex-col py-4 justify-start" asChild>
                  <Link href="/vehicle-health">
                    <Car className="mb-2 h-5 w-5" />
                    <span>Vehicle Health</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 justify-start" asChild>
                  <Link href="/maintenance">
                    <Wrench className="mb-2 h-5 w-5" />
                    <span>Maintenance</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 justify-start" asChild>
                  <Link href="/fault-detection">
                    <AlertTriangle className="mb-2 h-5 w-5" />
                    <span>Fault Detection</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto flex-col py-4 justify-start" asChild>
                  <Link href="/battery-health">
                    <BatteryCharging className="mb-2 h-5 w-5" />
                    <span>Battery Health</span>
                  </Link>
                </Button>
                <Button variant="outline" className="col-span-2 justify-between" asChild>
                  <Link href="/notifications">
                    <span>All Notifications</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[
                  {
                    date: "Today",
                    from: "Home",
                    to: "Office",
                    distance: "12.5 miles",
                    duration: "28 min",
                  },
                  {
                    date: "Yesterday",
                    from: "Office",
                    to: "Home",
                    distance: "13.2 miles",
                    duration: "32 min",
                  },
                  {
                    date: "Mar 15, 2024",
                    from: "Home",
                    to: "Shopping Mall",
                    distance: "8.7 miles",
                    duration: "22 min",
                  },
                  {
                    date: "Mar 14, 2024",
                    from: "Home",
                    to: "Gym",
                    distance: "5.3 miles",
                    duration: "15 min",
                  },
                ].map((trip, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="bg-primary/5 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium">{trip.date}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">From:</span>
                          <span className="text-sm">{trip.from}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">To:</span>
                          <span className="text-sm">{trip.to}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Distance:</span>
                          <span className="text-sm">{trip.distance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Duration:</span>
                          <span className="text-sm">{trip.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center">
                <Button variant="outline" asChild>
                  <Link href="/trip-history">View All Trips</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

