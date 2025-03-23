import {
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  BatteryWarning,
  Clock,
  History,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NotificationBell } from "@/components/notification-bell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"


export default function BatteryHealthPage() {
  return (
    <div className="flex flex-col ml-60">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold">Battery Health</h1>
        <div className="ml-auto flex items-center gap-4">
          <NotificationBell />
        </div>
      </header>
      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-destructive/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current Voltage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2 text-2xl font-bold text-destructive">11.8V</div>
                <BatteryWarning className="h-5 w-5 text-destructive" />
              </div>
              <p className="text-xs text-destructive">Critical - Needs attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Normal Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2 text-2xl font-bold">12.6V - 14.4V</div>
                <BatteryFull className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">Optimal operating range</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Battery Age</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2 text-2xl font-bold">2.5 years</div>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">Expected life: 3-5 years</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Health Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-2 text-2xl font-bold text-amber-500">65%</div>
                <BatteryMedium className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground">Degrading - Consider replacement</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Battery Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium">Current Health</h3>
                  <span className="text-sm text-amber-500">65%</span>
                </div>
                <div className="h-4 w-full rounded-full bg-muted">
                  <div className="h-4 rounded-full bg-amber-500" style={{ width: "65%" }}></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-sm font-medium">Charging Status</h3>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BatteryCharging className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">Not Charging</span>
                      </div>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive">
                        Warning
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Battery is not receiving charge from the alternator. This may indicate an alternator issue or a
                      loose connection.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-medium">Load Test Results</h3>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BatteryLow className="h-5 w-5 text-destructive" />
                        <span className="text-sm">Failed</span>
                      </div>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive">
                        Critical
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Battery failed the load test. It may not be able to provide sufficient power during high-demand
                      situations.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium">Recommendations</h3>
                <div className="rounded-lg border p-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-destructive/20 p-1 text-destructive">
                        <Battery className="h-4 w-4" />
                      </div>
                      <span>Replace battery as soon as possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-amber-500/20 p-1 text-amber-500">
                        <BatteryCharging className="h-4 w-4" />
                      </div>
                      <span>Check alternator and charging system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500/20 p-1 text-blue-500">
                        <History className="h-4 w-4" />
                      </div>
                      <span>Inspect battery terminals and connections</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="voltage">
          <TabsList>
            <TabsTrigger value="voltage">Voltage History</TabsTrigger>
            <TabsTrigger value="info">Battery Information</TabsTrigger>
          </TabsList>
          <TabsContent value="voltage" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Voltage History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full rounded-lg border bg-muted/40 p-4 flex items-center justify-center">
                  <p className="text-muted-foreground">Voltage history chart would be displayed here</p>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-sm font-medium">Recent Readings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Today, 9:30 AM</span>
                        </div>
                        <span className="font-medium text-destructive">11.8V</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Yesterday, 6:15 PM</span>
                        </div>
                        <span className="font-medium text-amber-500">12.1V</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Yesterday, 8:45 AM</span>
                        </div>
                        <span className="font-medium text-amber-500">12.3V</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Mar 15, 2024, 5:30 PM</span>
                        </div>
                        <span className="font-medium">12.6V</span>
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
                <CardTitle>Battery Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Battery Type:</span>
                        <span className="text-sm">Lead-Acid</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Capacity:</span>
                        <span className="text-sm">60 Ah</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Cold Cranking Amps:</span>
                        <span className="text-sm">600 CCA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Manufacturer:</span>
                        <span className="text-sm">DieHard</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Installation Date:</span>
                        <span className="text-sm">Oct 15, 2021</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Warranty:</span>
                        <span className="text-sm">3 years (expires Oct 2024)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Replacement Cost:</span>
                        <span className="text-sm">$120 - $180</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Last Tested:</span>
                        <span className="text-sm">Today</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 text-sm font-medium">Battery Care Tips</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Keep battery terminals clean and free of corrosion</li>
                      <li>• Avoid deep discharges which can shorten battery life</li>
                      <li>• Check battery connections regularly for tightness</li>
                      <li>• In extreme temperatures, consider using a battery insulator</li>
                      <li>• Have your charging system checked if battery repeatedly dies</li>
                    </ul>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button>Find Replacement</Button>
                    <Button variant="outline">Schedule Service</Button>
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

