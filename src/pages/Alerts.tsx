"use client"

import type React from "react"
import { useState } from "react"
import type { Vehicle } from "../types/vehicle"
import { mockAlerts } from "../data/mockData"
import Card from "../components/ui/Card"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"
import { AlertCircle, Bell, CheckCircle, Filter, X } from "lucide-react"

interface AlertsProps {
  selectedVehicle: Vehicle
}

const Alerts: React.FC<AlertsProps> = ({ selectedVehicle }) => {
  // Filter alerts for the selected vehicle
  const vehicleAlerts = mockAlerts.filter((alert) => alert.vehicleId === selectedVehicle.id)

  // State for filters
  const [filters, setFilters] = useState({
    type: "all", // 'all', 'critical', 'warning', 'info'
    isRead: "all", // 'all', 'read', 'unread'
    category: "all", // 'all', 'engine', 'battery', 'tire', 'fuel', 'maintenance', 'other'
  })

  // Apply filters
  const filteredAlerts = vehicleAlerts.filter((alert) => {
    if (filters.type !== "all" && alert.type !== filters.type) return false
    if (filters.isRead === "read" && !alert.isRead) return false
    if (filters.isRead === "unread" && alert.isRead) return false
    if (filters.category !== "all" && alert.category !== filters.category) return false
    return true
  })

  // Sort alerts by timestamp (newest first) and unread first
  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    // Unread alerts first
    if (a.isRead !== b.isRead) return a.isRead ? 1 : -1
    // Then by timestamp (newest first)
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })

  // Get alert type badge variant
  const getAlertBadgeVariant = (type: string) => {
    switch (type) {
      case "critical":
        return "danger"
      case "warning":
        return "warning"
      case "info":
        return "primary"
      default:
        return "default"
    }
  }

  // Get category badge variant
  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "engine":
        return "danger"
      case "battery":
        return "primary"
      case "tire":
        return "warning"
      case "fuel":
        return "secondary"
      case "maintenance":
        return "success"
      default:
        return "default"
    }
  }

  // Mark all as read
  const markAllAsRead = () => {
    // In a real app, this would update the backend
    alert("All alerts marked as read")
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      type: "all",
      isRead: "all",
      category: "all",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Alerts</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="danger" size="md">
            {vehicleAlerts.filter((a) => !a.isRead).length} Unread
          </Badge>
          <Button variant="outline" size="sm" onClick={markAllAsRead} leftIcon={<CheckCircle size={16} />}>
            Mark All Read
          </Button>
        </div>
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
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="all">All Types</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>

            <select
              className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.isRead}
              onChange={(e) => setFilters({ ...filters, isRead: e.target.value })}
            >
              <option value="all">All Status</option>
              <option value="read">Read</option>
              <option value="unread">Unread</option>
            </select>

            <select
              className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="all">All Categories</option>
              <option value="engine">Engine</option>
              <option value="battery">Battery</option>
              <option value="tire">Tire</option>
              <option value="fuel">Fuel</option>
              <option value="maintenance">Maintenance</option>
              <option value="other">Other</option>
            </select>

            <Button variant="outline" size="sm" onClick={clearFilters} leftIcon={<X size={16} />}>
              Clear
            </Button>
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {sortedAlerts.length > 0 ? (
          sortedAlerts.map((alert) => (
            <Card key={alert.id} className={`${!alert.isRead ? "border-l-4 border-red-500" : ""}`}>
              <div className="flex items-start">
                <div className="mr-3">
                  {alert.type === "critical" && <AlertCircle className="w-6 h-6 text-red-500" />}
                  {alert.type === "warning" && <AlertCircle className="w-6 h-6 text-yellow-500" />}
                  {alert.type === "info" && <Bell className="w-6 h-6 text-blue-500" />}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">{alert.title}</h3>
                    <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                      <Badge variant={getAlertBadgeVariant(alert.type)} size="sm">
                        {alert.type}
                      </Badge>
                      <Badge variant={getCategoryBadgeVariant(alert.category)} size="sm">
                        {alert.category}
                      </Badge>
                      {!alert.isRead && (
                        <Badge variant="danger" size="sm">
                          Unread
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3">{alert.message}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-500">
                    <span>{new Date(alert.timestamp).toLocaleString()}</span>

                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      {alert.actionRequired && (
                        <Button variant="primary" size="sm">
                          {alert.actionText || "Take Action"}
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        {alert.isRead ? "Mark as Unread" : "Mark as Read"}
                      </Button>
                      <Button variant="outline" size="sm">
                        Dismiss
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
              <Bell className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <h3 className="text-lg font-medium text-gray-800">No Alerts Found</h3>
              <p className="text-gray-500 mt-1">
                {vehicleAlerts.length > 0
                  ? "Try adjusting your filters to see more alerts."
                  : "Your vehicle has no alerts at this time."}
              </p>
              {vehicleAlerts.length > 0 && filters.type !== "all" && (
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

export default Alerts
