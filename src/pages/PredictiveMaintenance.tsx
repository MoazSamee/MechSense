"use client"

import type React from "react"
import { useState } from "react"
import type { Vehicle, MaintenanceItem } from "../types/vehicle"
import { mockMaintenanceItems } from "../data/mockData"
import Card from "../components/ui/Card"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"
import { Calendar, AlertTriangle, BarChart2, Clock, PenToolIcon as Tool, Filter, X } from "lucide-react"

interface PredictiveMaintenanceProps {
  selectedVehicle: Vehicle
}

const PredictiveMaintenance: React.FC<PredictiveMaintenanceProps> = ({ selectedVehicle }) => {
  // Filter maintenance items for the selected vehicle
  const vehicleMaintenanceItems = mockMaintenanceItems.filter((item) => item.vehicleId === selectedVehicle.id)

  // State for filters
  const [filters, setFilters] = useState({
    timeframe: "all", // 'all', 'month', 'quarter', 'year'
    priority: "all", // 'all', 'high', 'medium', 'low'
  })

  // Mock predicted maintenance items
  const [predictedItems] = useState<MaintenanceItem[]>([
    {
      id: "pred-1",
      vehicleId: selectedVehicle.id,
      title: "Brake Pad Replacement",
      description: "Based on your driving patterns, brake pads will need replacement soon.",
      dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
      dueMileage: selectedVehicle.mileage + 2000,
      status: "upcoming",
      priority: "medium",
      estimatedCost: 250,
    },
    {
      id: "pred-2",
      vehicleId: selectedVehicle.id,
      title: "Air Filter Replacement",
      description: "Air filter will need replacement based on mileage and environmental conditions.",
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      dueMileage: selectedVehicle.mileage + 1500,
      status: "upcoming",
      priority: "low",
      estimatedCost: 35,
    },
    {
      id: "pred-3",
      vehicleId: selectedVehicle.id,
      title: "Transmission Fluid Change",
      description: "Recommended based on fluid analysis and driving conditions.",
      dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      dueMileage: selectedVehicle.mileage + 5000,
      status: "upcoming",
      priority: "medium",
      estimatedCost: 150,
    },
  ])

  // Apply filters to predicted items
  const filteredItems = predictedItems.filter((item) => {
    // Timeframe filter
    if (filters.timeframe !== "all") {
      const now = new Date()
      const itemDate = new Date(item.dueDate)

      if (filters.timeframe === "month" && itemDate > new Date(now.setMonth(now.getMonth() + 1))) {
        return false
      } else if (filters.timeframe === "quarter" && itemDate > new Date(now.setMonth(now.getMonth() + 3))) {
        return false
      } else if (filters.timeframe === "year" && itemDate > new Date(now.setFullYear(now.getFullYear() + 1))) {
        return false
      }
    }

    // Priority filter
    if (filters.priority !== "all" && item.priority !== filters.priority) {
      return false
    }

    return true
  })

  // Sort items by due date
  const sortedItems = [...filteredItems].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

  // Get priority badge variant
  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "danger"
      case "medium":
        return "warning"
      case "low":
        return "success"
      default:
        return "default"
    }
  }

  // Format date to be more readable
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Calculate days until maintenance
  const getDaysUntil = (date: Date) => {
    const now = new Date()
    const dueDate = new Date(date)
    const diffTime = dueDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Clear filters
  const clearFilters = () => {
    setFilters({
      timeframe: "all",
      priority: "all",
    })
  }

  // Calculate maintenance cost projections
  const calculateCostProjections = () => {
    const nextMonth = predictedItems
      .filter((item) => getDaysUntil(item.dueDate) <= 30)
      .reduce((sum, item) => sum + (item.estimatedCost || 0), 0)

    const nextQuarter = predictedItems
      .filter((item) => getDaysUntil(item.dueDate) <= 90)
      .reduce((sum, item) => sum + (item.estimatedCost || 0), 0)

    const nextYear = predictedItems.reduce((sum, item) => sum + (item.estimatedCost || 0), 0)

    return { nextMonth, nextQuarter, nextYear }
  }

  const costProjections = calculateCostProjections()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Predictive Maintenance</h1>
        <Button variant="primary" size="sm" leftIcon={<Calendar size={16} />}>
          Schedule Service
        </Button>
      </div>

      {/* Vehicle Overview */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <img
              src={selectedVehicle.image || "/placeholder.svg?height=200&width=300"}
              alt={`${selectedVehicle.make} ${selectedVehicle.model}`}
              className="w-16 h-12 object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="text-lg font-medium">
                {selectedVehicle.make} {selectedVehicle.model}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedVehicle.year} • Mileage: {selectedVehicle.mileage.toLocaleString()} miles
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col items-center sm:items-start">
              <div className="text-xs text-gray-500">Last Service</div>
              <div className="text-sm font-medium">{formatDate(selectedVehicle.lastService)}</div>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <div className="text-xs text-gray-500">Next Service Due</div>
              <div className="text-sm font-medium">{formatDate(selectedVehicle.nextServiceDue)}</div>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <div className="text-xs text-gray-500">Service Due Mileage</div>
              <div className="text-sm font-medium">{selectedVehicle.nextServiceMileage.toLocaleString()} miles</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Cost Projections */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-1">Next 30 Days</div>
            <div className="text-2xl font-bold">${costProjections.nextMonth}</div>
            <div className="text-sm text-gray-500">Estimated costs</div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-1">Next 90 Days</div>
            <div className="text-2xl font-bold">${costProjections.nextQuarter}</div>
            <div className="text-sm text-gray-500">Estimated costs</div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-1">Next 12 Months</div>
            <div className="text-2xl font-bold">${costProjections.nextYear}</div>
            <div className="text-sm text-gray-500">Estimated costs</div>
          </div>
        </Card>
      </div>

      {/* Maintenance Timeline Chart (Placeholder) */}
      <Card title="Maintenance Timeline">
        <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
          <div className="text-center">
            <BarChart2 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">Maintenance timeline chart would display here</p>
          </div>
        </div>
      </Card>

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
              value={filters.timeframe}
              onChange={(e) => setFilters({ ...filters, timeframe: e.target.value })}
            >
              <option value="all">All Timeframes</option>
              <option value="month">Next 30 Days</option>
              <option value="quarter">Next 90 Days</option>
              <option value="year">Next 12 Months</option>
            </select>

            <select
              className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <Button variant="outline" size="sm" onClick={clearFilters} leftIcon={<X size={16} />}>
              Clear
            </Button>
          </div>
        </div>
      </Card>

      {/* Predicted Maintenance Items */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Predicted Maintenance</h2>

        {sortedItems.length > 0 ? (
          sortedItems.map((item) => (
            <Card key={item.id}>
              <div className="flex items-start">
                <div className="mr-3">
                  <Tool
                    className={`w-6 h-6 ${
                      item.priority === "high"
                        ? "text-red-500"
                        : item.priority === "medium"
                          ? "text-yellow-500"
                          : "text-blue-500"
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                      <Badge variant={getPriorityBadgeVariant(item.priority)} size="sm">
                        {item.priority} priority
                      </Badge>
                      <Badge variant="primary" size="sm">
                        Predicted
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3">{item.description}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Due: {formatDate(item.dueDate)}</span>
                        <span className="ml-1 text-xs">(in {getDaysUntil(item.dueDate)} days)</span>
                      </div>
                      <div>Mileage: {item.dueMileage.toLocaleString()} miles</div>
                      {item.estimatedCost && <div>Est. Cost: ${item.estimatedCost}</div>}
                    </div>

                    <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                      <Button variant="primary" size="sm" leftIcon={<Calendar size={16} />}>
                        Schedule
                      </Button>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <div className="text-center py-8">
              <Tool className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <h3 className="text-lg font-medium text-gray-800">No Predicted Maintenance</h3>
              <p className="text-gray-500 mt-1">
                {predictedItems.length > 0
                  ? "Try adjusting your filters to see more maintenance items."
                  : "No predicted maintenance items at this time."}
              </p>
              {predictedItems.length > 0 && (filters.timeframe !== "all" || filters.priority !== "all") && (
                <Button variant="outline" size="sm" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>

      {/* Maintenance Insights */}
      <Card title="Maintenance Insights">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <BarChart2 className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Driving Pattern Analysis</h4>
              <p className="text-sm text-gray-600">
                Based on your driving patterns, your brake pads are wearing faster than average. Consider gentler
                braking to extend their life.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Clock className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Seasonal Recommendation</h4>
              <p className="text-sm text-gray-600">
                Winter is approaching. Schedule a battery check and coolant system inspection before temperatures drop.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-yellow-100 p-2 rounded-full mr-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Potential Issue Detected</h4>
              <p className="text-sm text-gray-600">
                Slight irregularity detected in engine performance data. Consider a diagnostic check at your next
                service.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PredictiveMaintenance
