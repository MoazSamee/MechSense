import { Metadata } from "next"
import { AlertTriangle, History } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NotificationBell } from "@/components/notification-bell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Tire Pressure | Vehicle Monitoring System",
}

export default function TirePressurePage() {
  return (
    <div className="flex flex-col ml-60">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold">Tire Pressure</h1>
        <div className="ml-auto flex items-center gap-4">
          <NotificationBell />
        </div>
      </header>
      <div className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Current Tire Pressure</CardTitle>
              <Button variant="outline" size="sm">
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <div className="rounded-lg border p-4 text-center">
                  <div className="mb-2 text-sm font-medium">Front Left</div>
                  <div className="text-3xl font-bold text-amber-500">26 PSI</div>
                  <div className="mt-1 text-xs text-muted-foreground">Recommended: 32 PSI</div>
                </div>
                <Badge variant="outline" className="absolute -top-0 right-4 bg-amber-500/10 text-amber-500">
                  Low
                </Badge>
              </div>
              <div className="relative">
                <div className="rounded-lg border p-4 text-center">
                  <div className="mb-2 text-sm font-medium">Front Right</div>
                  <div className="text-3xl font-bold">32 PSI</div>
                  <div className="mt-1 text-xs text-muted-foreground">Recommended: 32 PSI</div>
                </div>
                <Badge variant="outline" className="absolute -top-0 right-4 bg-green-500/10 text-green-500">
                  Normal
                </Badge>
              </div>
              <div className="relative">
                <div className="rounded-lg border p-4 text-center">
                  <div className="mb-2 text-sm font-medium">Rear Left</div>
                  <div className="text-3xl font-bold">33 PSI</div>
                  <div className="mt-1 text-xs text-muted-foreground">Recommended: 32 PSI</div>
                </div>
                <Badge variant="outline" className="absolute -top-0 right-4 bg-green-500/10 text-green-500">
                  Normal
                </Badge>
              </div>
              <div className="relative">
                <div className="rounded-lg border p-4 text-center">
                  <div className="mb-2 text-sm font-medium">Rear Right</div>
                  <div className="text-3xl font-bold">32 PSI</div>
                  <div className="mt-1 text-xs text-muted-foreground">Recommended: 32 PSI</div>
                </div>
                <Badge variant="outline" className="absolute -top-0 right-4 bg-green-500/10 text-green-500">
                  Normal
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tire Pressure Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-amber-500/20 p-2 text-amber-500">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium">Low Tire Pressure Detected</h3>
                  <p className="text-sm text-muted-foreground">
                    Front left tire pressure is 26 PSI, which is below the recommended 32 PSI.
                  </p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium">Potential Issues:</h4>
                <ul className="ml-6 list-disc text-sm text-muted-foreground">
                  <li>Reduced fuel efficiency</li>
                  <li>Uneven tire wear</li>
                  <li>Compromised handling and braking</li>
                  <li>Increased risk of tire failure</li>
                </ul>
              </div>
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium">Recommended Actions:</h4>
                <ul className="ml-6 list-disc text-sm text-muted-foreground">
                  <li>Inflate tire to recommended pressure (32 PSI)</li>
                  <li>Check for punctures or slow leaks</li>
                  <li>Monitor pressure over the next few days</li>
                </ul>
              </div>
              <div className="mt-4 flex gap-2">
                <Button>Find Nearest Air Pump</Button>
                <Button variant="outline">Dismiss</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="history">
          <TabsList>
            <TabsTrigger value="history">Pressure History</TabsTrigger>
            <TabsTrigger value="info">Tire Information</TabsTrigger>
          </TabsList>
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Pressure History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full rounded-lg border bg-muted/40 p-4 flex items-center justify-center">
                  <p className="text-muted-foreground">Tire pressure history chart would be displayed here</p>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-sm font-medium">Recent Readings - Front Left</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <History className="h-4 w-4 text-muted-foreground" />
                          <span>Today, 9:30 AM</span>
                        </div>
                        <span className="font-medium text-amber-500">26 PSI</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <History className="h-4 w-4 text-muted-foreground" />
                          <span>Yesterday, 6:15 PM</span>
                        </div>
                        <span className="font-medium text-amber-500">27 PSI</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <History className="h-4 w-4 text-muted-foreground" />
                          <span>Yesterday, 8:45 AM</span>
                        </div>
                        <span className="font-medium text-amber-500">28 PSI</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <History className="h-4 w-4 text-muted-foreground" />
                          <span>Mar 15, 2024, 5:30 PM</span>
                        </div>
                        <span className="font-medium">32 PSI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="info" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tire Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Tire Size:</span>
                        <span className="text-sm">P215/55R17</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Manufacturer:</span>
                        <span className="text-sm">Michelin</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Model:</span>
                        <span className="text-sm">Defender T+H</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Installation Date:</span>
                        <span className="text-sm">Jun 10, 2022</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Recommended Pressure:</span>
                        <span className="text-sm">32 PSI</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Current Tread Depth:</span>
                        <span className="text-sm">7.5 mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Rotation Due:</span>
                        <span className="text-sm">In 3,500 miles</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Expected Life:</span>
                        <span className="text-sm">60,000 miles</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-sm font-medium">Tire Care Tips</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Check tire pressure at least once a month</li>
                      <li>• Rotate tires every 5,000-7,000 miles</li>
                      <li>• Inspect tires regularly for damage or wear</li>
                      <li>• Maintain proper wheel alignment</li>
                      <li>• Replace tires when tread depth reaches 2/32 inch</li>
                    </ul>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button>Find Tire Service</Button>
                    <Button variant="outline">Schedule Rotation</Button>
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

