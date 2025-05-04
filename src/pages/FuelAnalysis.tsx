"use client"

import type React from "react"
import { useState } from "react"
import type { Vehicle } from "../types/vehicle"
import { mockTrips } from "../data/mockData"
import Card from "../components/ui/Card"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"
import { BarChart2, Calendar, Droplet, Filter, TrendingDown, TrendingUp, X } from "lucide-react"

interface FuelAnalysisProps {
  selectedVehicle: Vehicle
}

const FuelAnalysis: React.FC<FuelAnalysisProps> = ({ selectedVehicle }) => {
  // Filter trips for the selected vehicle
  const vehicleTrips = mockTrips.filter((trip) => trip.vehicleId === selectedVehicle.id)

  // State for filters
  const [filters, setFilters] = useState({
    dateRange: "month", // 'week', 'month', 'year', 'all'
  })

  // Apply date range filter
  const getFilteredTrips = () => {
    const now = new Date()
    let cutoffDate: Date

    switch (filters.dateRange) {
      case "week":
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case "month":
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case "year":
        cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        break
      default:
        cutoffDate = new Date(0) // All time
    }

    return vehicleTrips.filter((trip) => new Date(trip.startTime) >= cutoffDate)
  }

  const filteredTrips = getFilteredTrips()

  // Calculate fuel statistics
  const calculateFuelStats = () => {
    if (filteredTrips.length === 0)
      return {
        totalFuelConsumed: 0,
        avgEfficiency: 0,
        totalDistance: 0,
        costEstimate: 0,
        co2Emissions: 0,
      }

    const totalFuelConsumed = filteredTrips.reduce((sum, trip) => sum + trip.fuelConsumed, 0)
    const totalDistance = filteredTrips.reduce((sum, trip) => sum + trip.distance, 0)
    const avgEfficiency = totalDistance / totalFuelConsumed || 0

    // Estimate cost based on fuel type and average prices
    const fuelPrice = selectedVehicle.fuelType === "diesel" ? 3.5 : selectedVehicle.fuelType === "electric" ? 0.12 : 3.2
    const costEstimate = totalFuelConsumed * fuelPrice

    // Estimate CO2 emissions (kg) - rough estimate
    const co2PerGallon = selectedVehicle.fuelType === "diesel" ? 10.21 : 8.89
    const co2Emissions = selectedVehicle.fuelType === "electric" ? 0 : totalFuelConsumed * co2PerGallon

    return {
      totalFuelConsumed: totalFuelConsumed.toFixed(2),
      avgEfficiency: avgEfficiency.toFixed(1),
      totalDistance: totalDistance.toFixed(1),
      costEstimate: costEstimate.toFixed(2),
      co2Emissions: co2Emissions.toFixed(1),
    }
  }

  const fuelStats = calculateFuelStats()

  // Calculate efficiency trend (mock data for demonstration)
  const getEfficiencyTrend = () => {
    if (filteredTrips.length < 2) return "stable"

    // Sort trips by date
    const sortedTrips = [...filteredTrips].sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    )

    // Compare first half vs second half efficiency
    const midpoint = Math.floor(sortedTrips.length / 2)
    const firstHalf = sortedTrips.slice(0, midpoint)
    const secondHalf = sortedTrips.slice(midpoint)

    const firstHalfEfficiency =
      firstHalf.reduce((sum, trip) => sum + trip.distance, 0) /
      firstHalf.reduce((sum, trip) => sum + trip.fuelConsumed, 0)
    const secondHalfEfficiency =
      secondHalf.reduce((sum, trip) => sum + trip.distance, 0) /
      secondHalf.reduce((sum, trip) => sum + trip.fuelConsumed, 0)

    const percentChange = ((secondHalfEfficiency - firstHalfEfficiency) / firstHalfEfficiency) * 100

    if (percentChange > 5) return "improving"
    if (percentChange < -5) return "declining"
    return "stable"
  }

  // Get trend icon and color
  const getTrendDisplay = () => {
    const trend = getEfficiencyTrend()
    if (trend === "improving")
      return { icon: <TrendingUp className="w-5 h-5 text-green-500" />, color: "text-green-500" }
    if (trend === "declining") return { icon: <TrendingDown className="w-5 h-5 text-red-500" />, color: "text-red-500" }
    return { icon: <BarChart2 className="w-5 h-5 text-blue-500" />, color: "text-blue-500" }
  }

  const trendDisplay = getTrendDisplay()

  // Clear filters
  const clearFilters = () => {
    setFilters({
      dateRange: "month",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Fuel Consumption Analysis</h1>
        <Button variant="primary" size="sm" leftIcon={<BarChart2 size={16} />}>
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium">Time Period</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last 12 Months</option>
              <option value="all">All Time</option>
            </select>

            <Button variant="outline" size="sm" onClick={clearFilters} leftIcon={<X size={16} />}>
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Fuel Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-1">Total Consumption</div>
            <div className="text-2xl font-bold">
              {fuelStats.totalFuelConsumed} {selectedVehicle.fuelType === "electric" ? "kWh" : "gal"}
            </div>
            <div className="text-sm text-gray-500">
              {filters.dateRange === "week"
                ? "Last 7 days"
                : filters.dateRange === "month"
                  ? "Last 30 days"
                  : filters.dateRange === "year"
                    ? "Last 12 months"
                    : "All time"}
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-1">Average Efficiency</div>
            <div className="flex items-center">
              <div className="text-2xl font-bold mr-2">{fuelStats.avgEfficiency}</div>
              {trendDisplay.icon}
            </div>
            <div className="text-sm text-gray-500">{selectedVehicle.fuelType === "electric" ? "mi/kWh" : "mpg"}</div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-1">Estimated Cost</div>
            <div className="text-2xl font-bold">${fuelStats.costEstimate}</div>
            <div className="text-sm text-gray-500">
              {selectedVehicle.fuelType === "electric" ? "@ $0.12/kWh" : "@ $3.20/gal"}
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-1">CO₂ Emissions</div>
            <div className="text-2xl font-bold">{fuelStats.co2Emissions} kg</div>
            <div className="text-sm text-gray-500">Carbon footprint</div>
          </div>
        </Card>
      </div>

      {/* Fuel Consumption Chart (Placeholder) */}
      <Card title="Fuel Consumption Trend">
        <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
          <div className="text-center">
            <BarChart2 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">Fuel consumption chart would display here</p>
            <p className="text-sm text-gray-400">
              Showing data for{" "}
              {filters.dateRange === "week"
                ? "the last 7 days"
                : filters.dateRange === "month"
                  ? "the last 30 days"
                  : filters.dateRange === "year"
                    ? "the last 12 months"
                    : "all time"}
            </p>
          </div>
        </div>
      </Card>

      {/* Trip Efficiency Table */}
      <Card title="Trip Efficiency">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Trip
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Distance
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Consumption
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Efficiency
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTrips.length > 0 ? (
                filteredTrips
                  .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
                  .slice(0, 5)
                  .map((trip) => (
                    <tr key={trip.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(trip.startTime).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {trip.startLocation} to {trip.endLocation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {trip.distance.toFixed(1)} mi
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {trip.fuelConsumed.toFixed(2)} {selectedVehicle.fuelType === "electric" ? "kWh" : "gal"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={
                            trip.fuelEfficiency > Number.parseFloat(fuelStats.avgEfficiency) * 1.1
                              ? "success"
                              : trip.fuelEfficiency < Number.parseFloat(fuelStats.avgEfficiency) * 0.9
                                ? "danger"
                                : "primary"
                          }
                          size="sm"
                        >
                          {trip.fuelEfficiency.toFixed(1)} {selectedVehicle.fuelType === "electric" ? "mi/kWh" : "mpg"}
                        </Badge>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No trips found for the selected time period
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredTrips.length > 5 && (
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              View All Trips
            </Button>
          </div>
        )}
      </Card>

      {/* Fuel Saving Tips */}
      <Card title="Fuel Efficiency Tips">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Droplet className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Maintain Steady Speed</h4>
              <p className="text-sm text-gray-600">
                Avoid rapid acceleration and braking. Maintaining a steady speed can improve fuel efficiency by up to
                30%.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Regular Maintenance</h4>
              <p className="text-sm text-gray-600">
                Keep your vehicle well-maintained with regular service. A well-tuned engine can improve fuel efficiency
                by up to 4%.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <BarChart2 className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Monitor Tire Pressure</h4>
              <p className="text-sm text-gray-600">
                Keep tires properly inflated. Under-inflated tires can lower gas mileage by about 0.2% for every 1 PSI
                drop.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default FuelAnalysis
