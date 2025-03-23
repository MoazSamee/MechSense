// Changed import type to regular import for compatibility
import { Metadata } from "next"
import { Calendar, Filter, MapPin, MoreHorizontal, Route } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NotificationBell } from "@/components/notification-bell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Trip History | Vehicle Monitoring System",
}

export default function TripHistoryPage() {
  return (
    <div className="flex flex-col ml-60">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold">Trip History</h1>
        <div className="ml-auto flex items-center gap-4">
          <NotificationBell />
        </div>
      </header>
      <div className="flex-1 space-y-6 p-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Trip Analytics</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Calendar className="mr-2 h-4 w-4" />
                  This Month
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">487.5 miles</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Speed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">38.2 mph</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6 h-[300px] w-full rounded-lg border bg-muted/40 p-4 flex items-center justify-center">
              <p className="text-muted-foreground">Trip analytics chart would be displayed here</p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="recent">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="recent">Recent Trips</TabsTrigger>
              <TabsTrigger value="frequent">Frequent Routes</TabsTrigger>
            </TabsList>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <Input placeholder="Search trips..." className="h-8 w-full sm:w-[200px]" />
              <Button variant="outline" size="sm" className="h-8">
                Search
              </Button>
            </div>
          </div>
          <TabsContent value="recent" className="mt-4 space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <div className="relative overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Route</th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                            Distance
                          </th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                            Duration
                          </th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                            Avg. Speed
                          </th>
                          <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            date: "Today, 9:30 AM",
                            from: "Home",
                            to: "Office",
                            distance: "12.5 miles",
                            duration: "28 min",
                            avgSpeed: "26 mph",
                          },
                          {
                            date: "Yesterday, 6:15 PM",
                            from: "Office",
                            to: "Home",
                            distance: "13.2 miles",
                            duration: "32 min",
                            avgSpeed: "24 mph",
                          },
                          {
                            date: "Yesterday, 8:45 AM",
                            from: "Home",
                            to: "Office",
                            distance: "12.5 miles",
                            duration: "25 min",
                            avgSpeed: "30 mph",
                          },
                          {
                            date: "Mar 15, 2024, 5:30 PM",
                            from: "Office",
                            to: "Gym",
                            distance: "5.3 miles",
                            duration: "15 min",
                            avgSpeed: "21 mph",
                          },
                          {
                            date: "Mar 15, 2024, 7:45 PM",
                            from: "Gym",
                            to: "Home",
                            distance: "8.7 miles",
                            duration: "22 min",
                            avgSpeed: "24 mph",
                          },
                        ].map((trip, i) => (
                          <tr
                            key={i}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">{trip.date}</td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <span>{trip.from}</span>
                                <span className="text-muted-foreground">→</span>
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <span>{trip.to}</span>
                              </div>
                            </td>
                            <td className="p-4 align-middle">{trip.distance}</td>
                            <td className="p-4 align-middle">{trip.duration}</td>
                            <td className="p-4 align-middle">{trip.avgSpeed}</td>
                            <td className="p-4 text-right align-middle">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Export Data</DropdownMenuItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </TabsContent>
          <TabsContent value="frequent" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      from: "Home",
                      to: "Office",
                      count: 42,
                      avgDistance: "12.8 miles",
                      avgDuration: "27 min",
                    },
                    {
                      from: "Office",
                      to: "Home",
                      count: 38,
                      avgDistance: "13.1 miles",
                      avgDuration: "30 min",
                    },
                    {
                      from: "Home",
                      to: "Gym",
                      count: 12,
                      avgDistance: "5.3 miles",
                      avgDuration: "15 min",
                    },
                    {
                      from: "Gym",
                      to: "Home",
                      count: 12,
                      avgDistance: "5.3 miles",
                      avgDuration: "14 min",
                    },
                    {
                      from: "Home",
                      to: "Shopping Mall",
                      count: 8,
                      avgDistance: "8.7 miles",
                      avgDuration: "22 min",
                    },
                    {
                      from: "Shopping Mall",
                      to: "Home",
                      count: 8,
                      avgDistance: "8.9 miles",
                      avgDuration: "24 min",
                    },
                  ].map((route, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-medium">
                            <div className="flex items-center gap-1">
                              <Route className="h-4 w-4 text-muted-foreground" />
                              <span>{route.from}</span>
                              <span className="text-muted-foreground">→</span>
                              <span>{route.to}</span>
                            </div>
                          </CardTitle>
                          <Badge variant="outline">{route.count} trips</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Avg. Distance:</span>
                            <span className="text-sm font-medium">{route.avgDistance}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Avg. Duration:</span>
                            <span className="text-sm font-medium">{route.avgDuration}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}