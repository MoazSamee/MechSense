import { AlertTriangle, Battery, Bell, Calendar, Check, Clock, Filter, Gauge, Wrench, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"


export default function NotificationsPage() {
  return (
    <div className="flex flex-col ml-60">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold">Notifications</h1>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        </div>
      </header>
      <div className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Smart Notifications</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Input placeholder="Search notifications..." className="h-8 w-full sm:w-[200px]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">
                  All
                  <Badge className="ml-2 bg-primary text-primary-foreground">12</Badge>
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread
                  <Badge className="ml-2 bg-primary text-primary-foreground">3</Badge>
                </TabsTrigger>
                <TabsTrigger value="alerts">
                  Alerts
                  <Badge className="ml-2 bg-destructive text-destructive-foreground">2</Badge>
                </TabsTrigger>
                <TabsTrigger value="maintenance">
                  Maintenance
                  <Badge className="ml-2 bg-blue-500 text-white">1</Badge>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4 space-y-4">
                <div className="space-y-4">
                  <div className="rounded-lg border bg-destructive/5 p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-destructive/20 p-2 text-destructive">
                        <Battery className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-destructive">Battery Warning</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-destructive/10 text-destructive">
                              Critical
                            </Badge>
                            <span className="text-xs text-muted-foreground">Today, 9:30 AM</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Battery voltage is low (11.8V). This may indicate a failing battery or charging system issue.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm">View Details</Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-amber-500/5 p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-amber-500/20 p-2 text-amber-500">
                        <Gauge className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-amber-500">Low Tire Pressure</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                              Warning
                            </Badge>
                            <span className="text-xs text-muted-foreground">Today, 10:15 AM</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Front left tire pressure is low (26 PSI). Recommended pressure is 32 PSI.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm">View Details</Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-500/20 p-2 text-blue-500">
                        <Wrench className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Oil Change Due</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                              Maintenance
                            </Badge>
                            <span className="text-xs text-muted-foreground">Yesterday, 2:45 PM</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Scheduled maintenance: Oil change due in 500 miles.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm">Schedule Service</Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-green-500/20 p-2 text-green-500">
                        <Check className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Trip Completed</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              Info
                            </Badge>
                            <span className="text-xs text-muted-foreground">Yesterday, 6:30 PM</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Trip from Office to Home completed. Distance: 13.2 miles, Duration: 32 min.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm">View Trip</Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-muted p-2 text-muted-foreground">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Maintenance Reminder</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Info</Badge>
                            <span className="text-xs text-muted-foreground">Mar 15, 2024</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Tire rotation due in 3,500 miles.</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm">View Maintenance</Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button variant="outline">Load More</Button>
                </div>
              </TabsContent>
              <TabsContent value="unread" className="mt-4">
                <div className="space-y-4">
                  <div className="rounded-lg border bg-destructive/5 p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-destructive/20 p-2 text-destructive">
                        <Battery className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-destructive">Battery Warning</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-destructive/10 text-destructive">
                              Critical
                            </Badge>
                            <span className="text-xs text-muted-foreground">Today, 9:30 AM</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Battery voltage is low (11.8V). This may indicate a failing battery or charging system issue.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm">View Details</Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-amber-500/5 p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-amber-500/20 p-2 text-amber-500">
                        <Gauge className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-amber-500">Low Tire Pressure</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                              Warning
                            </Badge>
                            <span className="text-xs text-muted-foreground">Today, 10:15 AM</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Front left tire pressure is low (26 PSI). Recommended pressure is 32 PSI.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm">View Details</Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-500/20 p-2 text-blue-500">
                        <Wrench className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Oil Change Due</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                              Maintenance
                            </Badge>
                            <span className="text-xs text-muted-foreground">Yesterday, 2:45 PM</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Scheduled maintenance: Oil change due in 500 miles.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm">Schedule Service</Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="alerts" className="mt-4">
                <div className="space-y-4">
                  <div className="rounded-lg border bg-destructive/5 p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-destructive/20 p-2 text-destructive">
                        <Battery className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-destructive">Battery Warning</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-destructive/10 text-destructive">
                              Critical
                            </Badge>
                            <span className="text-xs text-muted-foreground">Today, 9:30 AM</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Battery voltage is low (11.8V). This may indicate a failing battery or charging system issue.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm">View Details</Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-amber-500/5 p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-amber-500/20 p-2 text-amber-500">
                        <Gauge className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-amber-500">Low Tire Pressure</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                              Warning
                            </Badge>
                            <span className="text-xs text-muted-foreground">Today, 10:15 AM</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Front left tire pressure is low (26 PSI). Recommended pressure is 32 PSI.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm">View Details</Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="maintenance" className="mt-4">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-blue-500/20 p-2 text-blue-500">
                        <Wrench className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Oil Change Due</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                              Maintenance
                            </Badge>
                            <span className="text-xs text-muted-foreground">Yesterday, 2:45 PM</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Scheduled maintenance: Oil change due in 500 miles.
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm">Schedule Service</Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-muted p-2 text-muted-foreground">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Maintenance Reminder</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Info</Badge>
                            <span className="text-xs text-muted-foreground">Mar 15, 2024</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Tire rotation due in 3,500 miles.</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm">View Maintenance</Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="mb-4 font-medium">Alert Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Critical Alerts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Enabled
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Maintenance Reminders</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Enabled
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Trip Summaries</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Enabled
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Marketing Messages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-destructive/10 text-destructive">
                        Disabled
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-4 font-medium">Notification Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">In-App Notifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Enabled
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Email Notifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Enabled
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">SMS Notifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-destructive/10 text-destructive">
                        Disabled
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button>Update Preferences</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

