
import { Calendar, Check, Filter, Wrench } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NotificationBell } from "@/components/notification-bell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"


export default function MaintenancePage() {
  return (
    <div className="flex flex-col ml-60">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold">Maintenance</h1>
        <div className="ml-auto flex items-center gap-4">
          <NotificationBell />
        </div>
      </header>
      <div className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Maintenance</CardTitle>
              <Button variant="outline" size="sm">
                Schedule Service
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border">
                <div className="flex items-center justify-between border-b p-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-500/20 p-1 text-blue-500">
                      <Filter className="h-4 w-4" />
                    </div>
                    <div className="font-medium">Oil Change</div>
                  </div>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                    Due Soon
                  </Badge>
                </div>
                <div className="p-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <div className="text-sm font-medium">Current</div>
                      <div className="text-sm text-muted-foreground">4,500 miles since last change</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Due</div>
                      <div className="text-sm text-muted-foreground">In 500 miles</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Interval</div>
                      <div className="text-sm text-muted-foreground">Every 5,000 miles</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="flex items-center justify-between border-b p-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-500/20 p-1 text-blue-500">
                      <Wrench className="h-4 w-4" />
                    </div>
                    <div className="font-medium">Tire Rotation</div>
                  </div>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
                <div className="p-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <div className="text-sm font-medium">Current</div>
                      <div className="text-sm text-muted-foreground">3,500 miles since last rotation</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Due</div>
                      <div className="text-sm text-muted-foreground">In 3,500 miles</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Interval</div>
                      <div className="text-sm text-muted-foreground">Every 7,000 miles</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>50%</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border">
                <div className="flex items-center justify-between border-b p-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-blue-500/20 p-1 text-blue-500">
                      <Wrench className="h-4 w-4" />
                    </div>
                    <div className="font-medium">Brake Inspection</div>
                  </div>
                  <Badge variant="outline">Upcoming</Badge>
                </div>
                <div className="p-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <div className="text-sm font-medium">Current</div>
                      <div className="text-sm text-muted-foreground">8,000 miles since last inspection</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Due</div>
                      <div className="text-sm text-muted-foreground">In 7,000 miles</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Interval</div>
                      <div className="text-sm text-muted-foreground">Every 15,000 miles</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>53%</span>
                    </div>
                    <Progress value={53} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="schedule">
          <TabsList>
            <TabsTrigger value="schedule">Maintenance Schedule</TabsTrigger>
            <TabsTrigger value="history">Service History</TabsTrigger>
          </TabsList>
          <TabsContent value="schedule" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-4 font-medium">Regular Maintenance</h3>
                    <div className="space-y-4">
                      <div className="grid gap-2 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Oil Change</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Every 5,000 miles</div>
                        <div className="text-sm text-muted-foreground">Next: 500 miles</div>
                      </div>
                      <div className="grid gap-2 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Air Filter</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Every 15,000 miles</div>
                        <div className="text-sm text-muted-foreground">Next: 5,000 miles</div>
                      </div>
                      <div className="grid gap-2 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Tire Rotation</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Every 7,000 miles</div>
                        <div className="text-sm text-muted-foreground">Next: 3,500 miles</div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-4 font-medium">Major Services</h3>
                    <div className="space-y-4">
                      <div className="grid gap-2 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Brake Service</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Every 30,000 miles</div>
                        <div className="text-sm text-muted-foreground">Next: 20,000 miles</div>
                      </div>
                      <div className="grid gap-2 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Transmission Fluid</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Every 60,000 miles</div>
                        <div className="text-sm text-muted-foreground">Next: 50,000 miles</div>
                      </div>
                      <div className="grid gap-2 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Timing Belt</span>
                        </div>
                        <div className="text-sm text-muted-foreground">Every 100,000 miles</div>
                        <div className="text-sm text-muted-foreground">Next: 90,000 miles</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Service History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between border-b p-4">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-green-500/20 p-1 text-green-500">
                          <Check className="h-4 w-4" />
                        </div>
                        <div className="font-medium">Oil Change</div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Jan 15, 2024</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <div className="text-sm font-medium">Odometer</div>
                          <div className="text-sm text-muted-foreground">45,500 miles</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Service Provider</div>
                          <div className="text-sm text-muted-foreground">QuickLube Service Center</div>
                        </div>
                        <div className="md:col-span-2">
                          <div className="text-sm font-medium">Notes</div>
                          <div className="text-sm text-muted-foreground">
                            Full synthetic oil change with filter replacement
                          </div>
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
                        <div className="font-medium">Tire Rotation</div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Dec 10, 2023</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <div className="text-sm font-medium">Odometer</div>
                          <div className="text-sm text-muted-foreground">42,000 miles</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Service Provider</div>
                          <div className="text-sm text-muted-foreground">City Tire & Auto</div>
                        </div>
                        <div className="md:col-span-2">
                          <div className="text-sm font-medium">Notes</div>
                          <div className="text-sm text-muted-foreground">Rotated tires and balanced wheels</div>
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
                        <div className="font-medium">Brake Service</div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Oct 5, 2023</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <div className="text-sm font-medium">Odometer</div>
                          <div className="text-sm text-muted-foreground">38,500 miles</div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Service Provider</div>
                          <div className="text-sm text-muted-foreground">Metro Auto Repair</div>
                        </div>
                        <div className="md:col-span-2">
                          <div className="text-sm font-medium">Notes</div>
                          <div className="text-sm text-muted-foreground">Replaced front brake pads and rotors</div>
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

