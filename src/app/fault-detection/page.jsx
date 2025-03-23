import { Metadata } from "next"
import { AlertTriangle, Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NotificationBell } from "@/components/notification-bell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Fault Detection | Vehicle Monitoring System",
}

export default function FaultDetectionPage() {
  return (
    <div className="flex flex-col ml-60">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold">Fault Detection</h1>
        <div className="ml-auto flex items-center gap-4">
          <NotificationBell />
        </div>
      </header>
      <div className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>System Status</CardTitle>
              <Button variant="outline" size="sm">
                Run Diagnostics
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2 rounded-lg border p-4">
                <div className="rounded-full bg-green-500/20 p-2 text-green-500">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Engine</div>
                  <div className="text-xs text-muted-foreground">Normal</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-4">
                <div className="rounded-full bg-green-500/20 p-2 text-green-500">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Transmission</div>
                  <div className="text-xs text-muted-foreground">Normal</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-4">
                <div className="rounded-full bg-green-500/20 p-2 text-green-500">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Brakes</div>
                  <div className="text-xs text-muted-foreground">Normal</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-4">
                <div className="rounded-full bg-amber-500/20 p-2 text-amber-500">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Tires</div>
                  <div className="text-xs text-muted-foreground">Warning</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-4">
                <div className="rounded-full bg-destructive/20 p-2 text-destructive">
                  <X className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Battery</div>
                  <div className="text-xs text-muted-foreground">Critical</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-4">
                <div className="rounded-full bg-green-500/20 p-2 text-green-500">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Cooling</div>
                  <div className="text-xs text-muted-foreground">Normal</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-4">
                <div className="rounded-full bg-green-500/20 p-2 text-green-500">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Fuel System</div>
                  <div className="text-xs text-muted-foreground">Normal</div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-4">
                <div className="rounded-full bg-green-500/20 p-2 text-green-500">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Exhaust</div>
                  <div className="text-xs text-muted-foreground">Normal</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="active">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="active">
                Active Issues
                <Badge className="ml-2 bg-destructive text-destructive-foreground">2</Badge>
              </TabsTrigger>
              <TabsTrigger value="history">Issue History</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="active" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="bg-destructive/10 pb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <CardTitle className="text-base font-medium text-destructive">Battery Voltage Low</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="grid gap-2 md:grid-cols-2">
                    <div>
                      <div className="text-sm font-medium">Current Reading</div>
                      <div className="text-lg font-bold text-destructive">11.8V</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Normal Range</div>
                      <div className="text-lg font-bold">12.6V - 14.4V</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Description</div>
                    <div className="text-sm text-muted-foreground">
                      Battery voltage is critically low. This may indicate a failing battery or charging system issue.
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Recommended Action</div>
                    <div className="text-sm text-muted-foreground">
                      Check battery connections, test alternator output, and consider replacing the battery if it fails
                      a load test.
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button>Schedule Service</Button>
                    <Button variant="outline">Ignore</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-amber-500/10 pb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <CardTitle className="text-base font-medium text-amber-500">Low Tire Pressure</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="grid gap-2 md:grid-cols-2">
                    <div>
                      <div className="text-sm font-medium">Current Reading</div>
                      <div className="text-lg font-bold text-amber-500">26 PSI (Front Left)</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Recommended</div>
                      <div className="text-lg font-bold">32 PSI</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Description</div>
                    <div className="text-sm text-muted-foreground">
                      Front left tire pressure is below the recommended level. Low tire pressure can affect handling,
                      fuel economy, and tire life.
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Recommended Action</div>
                    <div className="text-sm text-muted-foreground">
                      Inflate tire to recommended pressure. Check for punctures or slow leaks if pressure drops again.
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button>Find Nearest Air Pump</Button>
                    <Button variant="outline">Ignore</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Issue History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between border-b p-4">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-green-500/20 p-1 text-green-500">
                          <Check className="h-4 w-4" />
                        </div>
                        <div className="font-medium">Engine Overheating</div>
                      </div>
                      <Badge variant="outline">Resolved</Badge>
                    </div>
                    <div className="p-4">
                      <div className="grid gap-2 md:grid-cols-3">
                        <div>
                          <div className="text-sm font-medium">Detected</div>
                          <div className="text-sm text-muted-foreground">Mar 10, 2024</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Resolved</div>
                          <div className="text-sm text-muted-foreground">Mar 12, 2024</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Solution</div>
                          <div className="text-sm text-muted-foreground">Replaced coolant and thermostat</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between border-b p-4">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-green-500/20 p-1 text-green-500">
                          <Check className="h-4 w-4" />
                        </div>
                        <div className="font-medium">Low Oil Pressure</div>
                      </div>
                      <Badge variant="outline">Resolved</Badge>
                    </div>
                    <div className="p-4">
                      <div className="grid gap-2 md:grid-cols-3">
                        <div>
                          <div className="text-sm font-medium">Detected</div>
                          <div className="text-sm text-muted-foreground">Feb 15, 2024</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Resolved</div>
                          <div className="text-sm text-muted-foreground">Feb 16, 2024</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Solution</div>
                          <div className="text-sm text-muted-foreground">Oil change and filter replacement</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between border-b p-4">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-green-500/20 p-1 text-green-500">
                          <Check className="h-4 w-4" />
                        </div>
                        <div className="font-medium">ABS Warning Light</div>
                      </div>
                      <Badge variant="outline">Resolved</Badge>
                    </div>
                    <div className="p-4">
                      <div className="grid gap-2 md:grid-cols-3">
                        <div>
                          <div className="text-sm font-medium">Detected</div>
                          <div className="text-sm text-muted-foreground">Jan 5, 2024</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Resolved</div>
                          <div className="text-sm text-muted-foreground">Jan 8, 2024</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Solution</div>
                          <div className="text-sm text-muted-foreground">Replaced faulty ABS sensor</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

