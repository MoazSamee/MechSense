// Changed import type to regular import for compatibility
import { Metadata } from "next"
import { Activity, AlertTriangle, ArrowRight, Car, Droplets, Thermometer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusCard } from "@/components/status-card"
import { NotificationBell } from "@/components/notification-bell"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export const metadata = {
  title: "Vehicle Health | Vehicle Monitoring System",
}

export default function VehicleHealthPage() {
  return (
    <div className="flex flex-col ml-60">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold">Vehicle Health</h1>
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
            footer="Operating efficiently"
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
            title="Engine Temperature"
            value="195°F"
            icon={<Thermometer className="h-4 w-4" />}
            status="normal"
            footer="Normal operating range"
          />
          <StatusCard
            title="Oil Level"
            value="85%"
            icon={<Droplets className="h-4 w-4" />}
            status="normal"
            footer={
              <div className="mt-2">
                <Progress value={85} className="h-2" />
              </div>
            }
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Engine Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">RPM:</span>
                      <span className="text-sm">1,200</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Speed:</span>
                      <span className="text-sm">0 mph</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Throttle Position:</span>
                      <span className="text-sm">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Engine Load:</span>
                      <span className="text-sm">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Diagnostic Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-green-500/20 p-1 text-green-500">
                        <Activity className="h-4 w-4" />
                      </div>
                      <span className="text-sm">No fault codes detected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-green-500/20 p-1 text-green-500">
                        <Activity className="h-4 w-4" />
                      </div>
                      <span className="text-sm">All systems operating normally</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-amber-500/20 p-1 text-amber-500">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <span className="text-sm">Tire pressure warning (Front left)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tire Pressure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3 text-center">
                  <div className="mb-2 text-sm font-medium">Front Left</div>
                  <div className="text-xl font-bold text-amber-500">26 PSI</div>
                  <div className="mt-1 text-xs text-muted-foreground">Low</div>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <div className="mb-2 text-sm font-medium">Front Right</div>
                  <div className="text-xl font-bold">32 PSI</div>
                  <div className="mt-1 text-xs text-muted-foreground">Normal</div>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <div className="mb-2 text-sm font-medium">Rear Left</div>
                  <div className="text-xl font-bold">33 PSI</div>
                  <div className="mt-1 text-xs text-muted-foreground">Normal</div>
                </div>
                <div className="rounded-lg border p-3 text-center">
                  <div className="mb-2 text-sm font-medium">Rear Right</div>
                  <div className="text-xl font-bold">32 PSI</div>
                  <div className="mt-1 text-xs text-muted-foreground">Normal</div>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/tire-pressure">
                    <span>View Details</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}