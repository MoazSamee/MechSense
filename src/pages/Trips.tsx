"use client"

import type React from "react"
import { useState } from "react"
import type { Vehicle } from "../types/vehicle"
import { mockTrips } from "../data/mockData"
import Card from "../components/ui/Card"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"
import { Calendar, Filter, BarChart2, X, Clock, Droplet, MapPin, Activity } from "lucide-react"

interface TripsProps {
  selectedVehicle: Vehicle
}

const Trips: React.FC<TripsProps> = ({ selectedVehicle }) => {
  // Filter trips for the selected vehicle
  const vehicleTrips = mockTrips.filter((trip) => trip.vehicleId === selectedVehicle.id)

  // State for expanded trip
  const [expandedTrip, setExpandedTrip] = useState<string | null>(null)

  // State for filters
  const [filters, setFilters] = useState({
    dateRange: "all", // 'all', 'today', 'week', 'month'
    minDistance: 0,
    maxDistance: 1000,
    sortBy: "date", // 'date', 'distance', 'duration', 'efficiency'
  })

  // Apply filters
  const filteredTrips = vehicleTrips.filter((trip) => {
    // Date range filter
    if (filters.dateRange !== "all") {
      const now = new Date()
      const tripDate = new Date(trip.startTime)

      if (filters.dateRange === "today") {
        if (
          tripDate.getDate() !== now.getDate() ||
          tripDate.getMonth() !== now.getMonth() ||
          tripDate.getFullYear() !== now.getFullYear()
        ) {
          return false
        }
      } else if (filters.dateRange === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        if (tripDate < weekAgo) return false
      } else if (filters.dateRange === "month") {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        if (tripDate < monthAgo) return false
      }
    }

    // Distance filter
    if (trip.distance < filters.minDistance || trip.distance > filters.maxDistance) {
      return false
    }

    return true
  })

  // Sort trips
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (filters.sortBy === "date") {
      return new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    } else if (filters.sortBy === "distance") {
      return b.distance - a.distance
    } else if (filters.sortBy === "duration") {
      return b.duration - a.duration
    } else if (filters.sortBy === "efficiency") {
      return b.fuelEfficiency - a.fuelEfficiency
    }
    return 0
  })

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Format time
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Format duration in hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours === 0) return `${mins}m`
    return `${hours}h ${mins}m`
  }

  // Toggle expanded trip
  const toggleExpandTrip = (tripId: string) => {
    if (expandedTrip === tripId) {
      setExpandedTrip(null)
    } else {
      setExpandedTrip(tripId)
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      dateRange: "all",
      minDistance: 0,
      maxDistance: 1000,
      sortBy: "date",
    })
  }

  // Calculate trip statistics
  const calculateTripStats = () => {
    if (filteredTrips.length === 0) return { totalDistance: 0, avgDistance: 0, avgDuration: 0, avgEfficiency: 0 }

    const totalDistance = filteredTrips.reduce((sum, trip) => sum + trip.distance, 0)
    const avgDistance = totalDistance / filteredTrips.length
    const avgDuration = filteredTrips.reduce((sum, trip) => sum + trip.duration, 0) / filteredTrips.length
    const avgEfficiency = filteredTrips.reduce((sum, trip) => sum + trip.fuelEfficiency, 0) / filteredTrips.length

    return {
      totalDistance: totalDistance.toFixed(1),
      avgDistance: avgDistance.toFixed(1),
      avgDuration: Math.round(avgDuration),
      avgEfficiency: avgEfficiency.toFixed(1),
    }
  }

  const tripStats = calculateTripStats()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Trip History</h1>
        <Button variant="primary" size="sm" leftIcon={<BarChart2 size={16} />}>
          Generate Report
        </Button>
      </div>

      {/* Trip Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-1">Total Distance</div>
            <div className="text-2xl font-bold">{tripStats.totalDistance} mi</div>
            <div className="text-sm text-gray-500">{filteredTrips.length} trips</div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-1">Average Trip</div>
            <div className="text-2xl font-bold">{tripStats.avgDistance} mi</div>
            <div className="text-sm text-gray-500">per trip</div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-1">Average Duration</div>
            <div className="text-2xl font-bold">{formatDuration(tripStats.avgDuration as number)}</div>
            <div className="text-sm text-gray-500">per trip</div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-1">Avg Fuel Efficiency</div>
            <div className="text-2xl font-bold">{tripStats.avgEfficiency}</div>
            <div className="text-sm text-gray-500">{selectedVehicle.fuelType === "electric" ? "mi/kWh" : "mpg"}</div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium">Filters</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>

            <select
              className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            >
              <option value="date">Sort by Date</option>
              <option value="distance">Sort by Distance</option>
              <option value="duration">Sort by Duration</option>
              <option value="efficiency">Sort by Efficiency</option>
            </select>

            <Button variant="outline" size="sm" onClick={clearFilters} leftIcon={<X size={16} />}>
              Clear
            </Button>
          </div>
        </div>
      </Card>

      {/* Trips List */}
      <div className="space-y-4">
        {sortedTrips.length > 0 ? (
          sortedTrips.map((trip) => (
            <Card key={trip.id}>
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm font-medium">{formatDate(trip.startTime)}</span>
                  </div>
                  <Badge variant="primary" size="sm">
                    {trip.distance.toFixed(1)} mi
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">From</div>
                    <div className="text-sm font-medium">{trip.startLocation}</div>
                    <div className="text-xs text-gray-500">{formatTime(trip.startTime)}</div>
                  </div>
                  <div className="hidden sm:block mx-4 text-gray-300">→</div>
                  <div className="flex-1 sm:text-right mt-2 sm:mt-0">
                    <div className="text-xs text-gray-500">To</div>
                    <div className="text-sm font-medium">{trip.endLocation}</div>
                    <div className="text-xs text-gray-500">{formatTime(trip.endTime)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mb-2">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{formatDuration(trip.duration)}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Activity className="w-3 h-3 mr-1" />
                    <span>{trip.averageSpeed} mph avg</span>
                  </div>
                  <div className="flex items-center justify-end">
                    <Droplet className="w-3 h-3 mr-1" />
                    <span>{trip.fuelEfficiency > 0 ? `${trip.fuelEfficiency} mpg` : "Electric"}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm" onClick={() => toggleExpandTrip(trip.id)} className="text-xs">
                    {expandedTrip === trip.id ? "Hide Details" : "Show Details"}
                  </Button>

                  {trip.driverScore !== undefined && (
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-1">Driver Score:</span>
                      <Badge
                        variant={trip.driverScore >= 90 ? "success" : trip.driverScore >= 70 ? "warning" : "danger"}
                        size="sm"
                      >
                        {trip.driverScore}
                      </Badge>
                    </div>
                  )}
                </div>

                {expandedTrip === trip.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-gray-500">Max Speed</div>
                        <div className="text-sm font-medium">{trip.maxSpeed} mph</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Fuel Consumed</div>
                        <div className="text-sm font-medium">
                          {trip.fuelConsumed > 0 ? `${trip.fuelConsumed.toFixed(1)} gal` : "0 kWh"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Efficiency</div>
                        <div className="text-sm font-medium">
                          {trip.fuelEfficiency > 0 ? `${trip.fuelEfficiency} mpg` : "N/A"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">CO₂ Emissions</div>
                        <div className="text-sm font-medium">
                          {selectedVehicle.fuelType === "electric"
                            ? "0 kg"
                            : `${(trip.fuelConsumed * 8.887).toFixed(1)} kg`}
                        </div>
                      </div>
                    </div>

                    {/* Simple map placeholder */}
                    <div className="mt-4 bg-gray-100 rounded-md p-4 flex items-center justify-center h-40">
                      <div className="text-center">
                        <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-500">Trip route map would display here</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <h3 className="text-lg font-medium text-gray-800">No Trips Found</h3>
              <p className="text-gray-500 mt-1">
                {vehicleTrips.length > 0
                  ? "Try adjusting your filters to see more trips."
                  : "Your vehicle has no recorded trips."}
              </p>
              {vehicleTrips.length > 0 && filters.dateRange !== "all" && (
                <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Trips
