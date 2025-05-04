"use client"

import type React from "react"
import { useState } from "react"
import type { Vehicle } from "../types/vehicle"
import { mockMaintenanceItems } from "../data/mockData"
import Card from "../components/ui/Card"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"
import { Calendar, Filter, PenToolIcon as Tool, Plus, X } from "lucide-react"

interface MaintenanceProps {
  selectedVehicle: Vehicle
}

const Maintenance: React.FC<MaintenanceProps> = ({ selectedVehicle }) => {
  // Filter maintenance items for the selected vehicle
  const vehicleMaintenanceItems = mockMaintenanceItems.filter((item) => item.vehicleId === selectedVehicle.id)

  // State for filters
  const [filters, setFilters] = useState({
    status: "all", // 'all', 'upcoming', 'due', 'overdue', 'completed'
    priority: "all", // 'all', 'high', 'medium', 'low'
  })

  // Apply filters
  const filteredItems = vehicleMaintenanceItems.filter((item) => {
    if (filters.status !== "all" && item.status !== filters.status) return false
    if (filters.priority !== "all" && item.priority !== filters.priority) return false
    return true
  })

  // Sort items by status (overdue > due > upcoming > completed) and then by due date
  const sortedItems = [...filteredItems].sort((a, b) => {
    // First by status
    const statusOrder = { overdue: 0, due: 1, upcoming: 2, completed: 3 }
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status]
    }

    // Then by due date
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "overdue":
        return "danger"
      case "due":
        return "warning"
      case "upcoming":
        return "primary"
      case "completed":
        return "success"
      default:
        return "default"
    }
  }

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

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: "all",
      priority: "all",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Maintenance Schedule</h1>
        <Button variant="primary" size="sm" leftIcon={<Plus size={16} />}>
          Add Maintenance Item
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
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">All Status</option>
              <option value="overdue">Overdue</option>
              <option value="due">Due</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
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

      {/* Maintenance Items List */}
      <div className="space-y-4">
        {sortedItems.length > 0 ? (
          sortedItems.map((item) => (
            <Card
              key={item.id}
              className={`
              ${
                item.status === "overdue"
                  ? "border-l-4 border-red-500"
                  : item.status === "due"
                    ? "border-l-4 border-yellow-500"
                    : item.status === "upcoming"
                      ? "border-l-4 border-blue-500"
                      : "border-l-4 border-green-500"
              }
            `}
            >
              <div className="flex items-start">
                <div className="mr-3">
                  <Tool
                    className={`w-6 h-6 ${
                      item.status === "overdue"
                        ? "text-red-500"
                        : item.status === "due"
                          ? "text-yellow-500"
                          : item.status === "upcoming"
                            ? "text-blue-500"
                            : "text-green-500"
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                      <Badge variant={getStatusBadgeVariant(item.status)} size="sm">
                        {item.status}
                      </Badge>
                      <Badge variant={getPriorityBadgeVariant(item.priority)} size="sm">
                        {item.priority} priority
                      </Badge>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3">{item.description}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Due: {formatDate(item.dueDate)}</span>
                      </div>
                      <div>Mileage: {item.dueMileage.toLocaleString()} miles</div>
                      {item.estimatedCost && <div>Est. Cost: ${item.estimatedCost}</div>}
                    </div>

                    <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                      <Button variant={item.status === "completed" ? "outline" : "primary"} size="sm">
                        {item.status === "completed" ? "Mark Incomplete" : "Mark Complete"}
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
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
              <h3 className="text-lg font-medium text-gray-800">No Maintenance Items Found</h3>
              <p className="text-gray-500 mt-1">
                {vehicleMaintenanceItems.length > 0
                  ? "Try adjusting your filters to see more maintenance items."
                  : "Your vehicle has no maintenance items scheduled."}
              </p>
              {vehicleMaintenanceItems.length > 0 && (filters.status !== "all" || filters.priority !== "all") && (
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

export default Maintenance
