import { Calendar, Droplets, Filter, Fuel, FuelIcon as GasPump, Gauge } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NotificationBell } from "@/components/notification-bell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { StatusCard } from "@/components/status-card"

export default function FuelConsumptionPage() {
  return (
    <div className="flex flex-col ml-60">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <h1 className="text-xl font-semibold">Fuel Consumption</h1>
        <div className="ml-auto flex items-center gap-4">
          <NotificationBell />
        </div>
      </header>
      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatusCard
            title="Current Fuel Level"
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
            title="Average MPG"
            value="28.5"
            icon={<Gauge className="h-4 w-4" />}
            status="normal"
            footer="Last 30 days"
          />
          <StatusCard
            title="Last Refuel"
            value="Mar 12"
            icon={<GasPump className="h-4 w-4" />}
            status="normal"
            footer="8 days ago"
          />
          <StatusCard
            title="Fuel Cost"
            value="$3.45/gal"
            icon={<Fuel className="h-4 w-4" />}
            status="normal"
            footer="Last refuel"
          />
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Fuel Consumption Analysis</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Calendar className="mr-2 h-4 w-4" />
                  Last 3 Months
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-lg border bg-muted/40 p-4 flex items-center justify-center">
              <p className="text-muted-foreground">Fuel consumption chart would be displayed here</p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Fuel Used</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87.5 gal</div>
                  <p className="text-xs text-muted-foreground">Last 3 months</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,493 miles</div>
                  <p className="text-xs text-muted-foreground">Last 3 months</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Fuel Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$301.87</div>
                  <p className="text-xs text-muted-foreground">Last 3 months</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="efficiency">
          <TabsList>
            <TabsTrigger value="efficiency">Efficiency Trends</TabsTrigger>
            <TabsTrigger value="refueling">Refueling History</TabsTrigger>
          </TabsList>
          <TabsContent value="efficiency" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Efficiency Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full rounded-lg border bg-muted/40 p-4 flex items-center justify-center">
                  <p className="text-muted-foreground">Efficiency trends chart would be displayed here</p>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-4 font-medium">Efficiency Factors</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="text-sm font-medium">Driving Style</h4>
                          <span className="text-sm text-amber-500">Moderate</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-amber-500" style={{ width: "65%" }}></div>
                        </div>
                        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                          <span>Aggressive</span>
                          <span>Moderate</span>
                          <span>Efficient</span>
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="text-sm font-medium">Route Efficiency</h4>
                          <span className="text-sm text-green-500">Good</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: "80%" }}></div>
                        </div>
                        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                          <span>Poor</span>
                          <span>Average</span>
                          <span>Good</span>
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="text-sm font-medium">Vehicle Maintenance</h4>
                          <span className="text-sm text-green-500">Excellent</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-green-500" style={{ width: "90%" }}></div>
                        </div>
                        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                          <span>Needs Work</span>
                          <span>Good</span>
                          <span>Excellent</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-4 font-medium">Efficiency Tips</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Avoid rapid acceleration and hard braking</li>
                      <li>• Maintain a steady speed on highways</li>
                      <li>• Keep tires properly inflated</li>
                      <li>• Remove excess weight from the vehicle</li>
                      <li>• Use cruise control on highways when possible</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="refueling" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Refueling History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                            Gallons
                          </th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                            Price/Gal
                          </th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                            Total Cost
                          </th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                            Odometer
                          </th>
                          <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">MPG</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            date: "Mar 12, 2024",
                            gallons: "12.5",
                            pricePerGal: "$3.45",
                            totalCost: "$43.13",
                            odometer: "50,245",
                            mpg: "28.2",
                          },
                          {
                            date: "Feb 28, 2024",
                            gallons: "13.2",
                            pricePerGal: "$3.39",
                            totalCost: "$44.75",
                            odometer: "49,893",
                            mpg: "26.7",
                          },
                          {
                            date: "Feb 14, 2024",
                            gallons: "12.8",
                            pricePerGal: "$3.42",
                            totalCost: "$43.78",
                            odometer: "49,542",
                            mpg: "27.4",
                          },
                          {
                            date: "Jan 30, 2024",
                            gallons: "13.5",
                            pricePerGal: "$3.50",
                            totalCost: "$47.25",
                            odometer: "49,192",
                            mpg: "25.9",
                          },
                          {
                            date: "Jan 15, 2024",
                            gallons: "12.9",
                            pricePerGal: "$3.55",
                            totalCost: "$45.80",
                            odometer: "48,842",
                            mpg: "27.1",
                          },
                        ].map((refuel, i) => (
                          <tr
                            key={i}
                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                          >
                            <td className="p-4 align-middle">{refuel.date}</td>
                            <td className="p-4 align-middle">{refuel.gallons}</td>
                            <td className="p-4 align-middle">{refuel.pricePerGal}</td>
                            <td className="p-4 align-middle">{refuel.totalCost}</td>
                            <td className="p-4 align-middle">{refuel.odometer}</td>
                            <td className="p-4 align-middle">{refuel.mpg}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline">Load More</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

