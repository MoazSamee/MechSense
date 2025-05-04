"use client"

import type React from "react"
import { useState } from "react"
import type { Vehicle } from "../types/vehicle"
import { mockTrips, mockMaintenanceItems, mockAlerts } from "../data/mockData"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import { BarChart2, Calendar, Download, FileText, Filter, Gauge, Mail, PieChart, X, Plus } from "lucide-react"
import Badge from "../components/ui/Badge"

interface ReportsProps {
  selectedVehicle: Vehicle
}

const Reports: React.FC<ReportsProps> = ({ selectedVehicle }) => {
  // State for report filters
  const [filters, setFilters] = useState({
    dateRange: "month", // 'week', 'month', 'quarter', 'year', 'custom'
    reportType: "all", // 'all', 'fuel', 'maintenance', 'trips', 'alerts'
    customStartDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    customEndDate: new Date().toISOString().split("T")[0],
  })

  // Filter trips for the selected vehicle
  const vehicleTrips = mockTrips.filter((trip) => trip.vehicleId === selectedVehicle.id)

  // Filter maintenance items for the selected vehicle
  const vehicleMaintenanceItems = mockMaintenanceItems.filter((item) => item.vehicleId === selectedVehicle.id)

  // Filter alerts for the selected vehicle
  const vehicleAlerts = mockAlerts.filter((alert) => alert.vehicleId === selectedVehicle.id)

  // Apply date range filter
  const getFilteredData = () => {
    let startDate: Date
    const endDate = new Date()

    switch (filters.dateRange) {
      case "week":
        startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case "month":
        startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case "quarter":
        startDate = new Date(endDate.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      case "year":
        startDate = new Date(endDate.getTime() - 365 * 24 * 60 * 60 * 1000)
        break
      case "custom":
        startDate = new Date(filters.customStartDate)
        break
      default:
        startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000)
    }

    // Filter trips
    const filteredTrips = vehicleTrips.filter((trip) => new Date(trip.startTime) >= startDate)

    // Filter maintenance items
    const filteredMaintenance = vehicleMaintenanceItems.filter((item) => new Date(item.dueDate) >= startDate)

    // Filter alerts
    const filteredAlerts = vehicleAlerts.filter((alert) => new Date(alert.timestamp) >= startDate)

    return {
      trips: filteredTrips,
      maintenance: filteredMaintenance,
      alerts: filteredAlerts,
    }
  }

  const filteredData = getFilteredData()

  // Calculate report statistics
  const calculateStats = () => {
    // Trips stats
    const totalDistance = filteredData.trips.reduce((sum, trip) => sum + trip.distance, 0)
    const totalDuration = filteredData.trips.reduce((sum, trip) => sum + trip.duration, 0)
    const avgSpeed =
      filteredData.trips.reduce((sum, trip) => sum + trip.averageSpeed, 0) / filteredData.trips.length || 0
    const maxSpeed = Math.max(...filteredData.trips.map((trip) => trip.maxSpeed), 0)

    // Fuel stats
    const totalFuelConsumed = filteredData.trips.reduce((sum, trip) => sum + trip.fuelConsumed, 0)
    const avgFuelEfficiency =
      filteredData.trips.reduce((sum, trip) => sum + trip.fuelEfficiency, 0) / filteredData.trips.length || 0

    // Maintenance stats
    const completedMaintenance = filteredData.maintenance.filter((item) => item.status === "completed").length
    const upcomingMaintenance = filteredData.maintenance.filter(
      (item) => item.status === "upcoming" || item.status === "due",
    ).length
    const overdueMaintenance = filteredData.maintenance.filter((item) => item.status === "overdue").length
    const maintenanceCosts = filteredData.maintenance
      .filter((item) => item.status === "completed")
      .reduce((sum, item) => sum + (item.estimatedCost || 0), 0)

    // Alerts stats
    const criticalAlerts = filteredData.alerts.filter((alert) => alert.type === "critical").length
    const warningAlerts = filteredData.alerts.filter((alert) => alert.type === "warning").length
    const infoAlerts = filteredData.alerts.filter((alert) => alert.type === "info").length

    return {
      trips: {
        count: filteredData.trips.length,
        totalDistance,
        totalDuration,
        avgSpeed,
        maxSpeed,
      },
      fuel: {
        totalFuelConsumed,
        avgFuelEfficiency,
        estimatedCost: totalFuelConsumed * 3.5, // Assuming $3.50 per gallon
      },
      maintenance: {
        completed: completedMaintenance,
        upcoming: upcomingMaintenance,
        overdue: overdueMaintenance,
        costs: maintenanceCosts,
      },
      alerts: {
        critical: criticalAlerts,
        warning: warningAlerts,
        info: infoAlerts,
        total: criticalAlerts + warningAlerts + infoAlerts,
      },
    }
  }

  const stats = calculateStats()

  // Format date range for display
  const getDateRangeDisplay = () => {
    const endDate = new Date()
    let startDate: Date

    switch (filters.dateRange) {
      case "week":
        startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      case "month":
        startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000)
        return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      case "quarter":
        startDate = new Date(endDate.getTime() - 90 * 24 * 60 * 60 * 1000)
        return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      case "year":
        startDate = new Date(endDate.getTime() - 365 * 24 * 60 * 60 * 1000)
        return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      case "custom":
        return `${new Date(filters.customStartDate).toLocaleDateString()} - ${new Date(
          filters.customEndDate,
        ).toLocaleDateString()}`
      default:
        return "Last 30 days"
    }
  }

  // Handle filter change
  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters({
      ...filters,
      [field]: value,
    })
  }

  // Clear filters
  const clearFilters = () => {
    setFilters({
      dateRange: "month",
      reportType: "all",
      customStartDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      customEndDate: new Date().toISOString().split("T")[0],
    })
  }

  // Generate and download report
  const downloadReport = () => {
    // In a real app, this would generate a PDF or CSV file
    alert("Downloading report...")
  }

  // Email report
  const emailReport = () => {
    // In a real app, this would send an email with the report
    alert("Emailing report...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Vehicle Reports</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" leftIcon={<Mail size={16} />} onClick={emailReport}>
            Email Report
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Download size={16} />} onClick={downloadReport}>
            Download Report
          </Button>
        </div>
      </div>

      {/* Report Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium">Report Filters</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 90 Days</option>
              <option value="year">Last 12 Months</option>
              <option value="custom">Custom Range</option>
            </select>

            {filters.dateRange === "custom" && (
              <>
                <input
                  type="date"
                  className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.customStartDate}
                  onChange={(e) => handleFilterChange("customStartDate", e.target.value)}
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filters.customEndDate}
                  onChange={(e) => handleFilterChange("customEndDate", e.target.value)}
                />
              </>
            )}

            <select
              className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.reportType}
              onChange={(e) => handleFilterChange("reportType", e.target.value)}
            >
              <option value="all">All Reports</option>
              <option value="fuel">Fuel Consumption</option>
              <option value="maintenance">Maintenance</option>
              <option value="trips">Trip History</option>
              <option value="alerts">Alerts</option>
            </select>

            <Button variant="outline" size="sm" onClick={clearFilters} leftIcon={<X size={16} />}>
              Reset
            </Button>
          </div>
        </div>
      </Card>

      {/* Report Summary */}
      <Card title="Report Summary">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">
                {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
              </h3>
              <p className="text-sm text-gray-500">{selectedVehicle.licensePlate}</p>
            </div>
            <Badge variant="secondary" size="lg">
              {getDateRangeDisplay()}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Total Trips</div>
              <div className="text-2xl font-bold">{stats.trips.count}</div>
              <div className="text-sm text-gray-500">
                {stats.trips.totalDistance.toFixed(1)} miles • {Math.floor(stats.trips.totalDuration / 60)}h{" "}
                {stats.trips.totalDuration % 60}m
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Fuel Consumption</div>
              <div className="text-2xl font-bold">
                {stats.fuel.totalFuelConsumed.toFixed(1)} {selectedVehicle.fuelType === "electric" ? "kWh" : "gal"}
              </div>
              <div className="text-sm text-gray-500">
                {stats.fuel.avgFuelEfficiency.toFixed(1)} {selectedVehicle.fuelType === "electric" ? "mi/kWh" : "mpg"} •
                ${stats.fuel.estimatedCost.toFixed(2)}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Maintenance</div>
              <div className="text-2xl font-bold">{stats.maintenance.completed + stats.maintenance.upcoming}</div>
              <div className="text-sm text-gray-500">
                {stats.maintenance.completed} completed • ${stats.maintenance.costs.toFixed(2)}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Alerts</div>
              <div className="text-2xl font-bold">{stats.alerts.total}</div>
              <div className="text-sm text-gray-500">
                {stats.alerts.critical} critical • {stats.alerts.warning} warnings
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Trip Report */}
      {(filters.reportType === "all" || filters.reportType === "trips") && (
        <Card title="Trip Report">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Trip Summary</h3>
              <Badge variant="secondary" size="sm">
                {filteredData.trips.length} trips
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart2 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Trip distance chart would display here</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Average Trip Distance</div>
                  <div className="text-xl font-medium">
                    {(stats.trips.totalDistance / stats.trips.count || 0).toFixed(1)} miles
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Average Trip Duration</div>
                  <div className="text-xl font-medium">
                    {Math.floor((stats.trips.totalDuration / stats.trips.count || 0) / 60)}h{" "}
                    {Math.floor((stats.trips.totalDuration / stats.trips.count || 0) % 60)}m
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Average Speed</div>
                  <div className="text-xl font-medium">{stats.trips.avgSpeed.toFixed(1)} mph</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Maximum Speed</div>
                  <div className="text-xl font-medium">{stats.trips.maxSpeed} mph</div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button variant="outline" size="sm" leftIcon={<FileText size={16} />}>
                View Detailed Trip Log
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Fuel Report */}
      {(filters.reportType === "all" || filters.reportType === "fuel") && (
        <Card title="Fuel Consumption Report">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Fuel Summary</h3>
              <Badge variant="secondary" size="sm">
                {selectedVehicle.fuelType}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart2 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Fuel consumption chart would display here</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Total Fuel Consumed</div>
                  <div className="text-xl font-medium">
                    {stats.fuel.totalFuelConsumed.toFixed(1)} {selectedVehicle.fuelType === "electric" ? "kWh" : "gal"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Average Fuel Efficiency</div>
                  <div className="text-xl font-medium">
                    {stats.fuel.avgFuelEfficiency.toFixed(1)}{" "}
                    {selectedVehicle.fuelType === "electric" ? "mi/kWh" : "mpg"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Estimated Fuel Cost</div>
                  <div className="text-xl font-medium">${stats.fuel.estimatedCost.toFixed(2)}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">CO₂ Emissions</div>
                  <div className="text-xl font-medium">
                    {selectedVehicle.fuelType === "electric"
                      ? "0 kg"
                      : `${(stats.fuel.totalFuelConsumed * 8.887).toFixed(1)} kg`}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button variant="outline" size="sm" leftIcon={<FileText size={16} />}>
                View Detailed Fuel Log
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Maintenance Report */}
      {(filters.reportType === "all" || filters.reportType === "maintenance") && (
        <Card title="Maintenance Report">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Maintenance Summary</h3>
              <Badge variant="secondary" size="sm">
                {stats.maintenance.completed + stats.maintenance.upcoming} items
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Maintenance status chart would display here</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Completed Maintenance</div>
                  <div className="text-xl font-medium">{stats.maintenance.completed} items</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Upcoming Maintenance</div>
                  <div className="text-xl font-medium">{stats.maintenance.upcoming} items</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Overdue Maintenance</div>
                  <div className="text-xl font-medium">{stats.maintenance.overdue} items</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Maintenance Costs</div>
                  <div className="text-xl font-medium">${stats.maintenance.costs.toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button variant="outline" size="sm" leftIcon={<FileText size={16} />}>
                View Detailed Maintenance Log
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Alerts Report */}
      {(filters.reportType === "all" || filters.reportType === "alerts") && (
        <Card title="Alerts Report">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Alerts Summary</h3>
              <Badge variant="secondary" size="sm">
                {stats.alerts.total} alerts
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Alerts by type chart would display here</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Critical Alerts</div>
                  <div className="text-xl font-medium">{stats.alerts.critical} alerts</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Warning Alerts</div>
                  <div className="text-xl font-medium">{stats.alerts.warning} alerts</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Info Alerts</div>
                  <div className="text-xl font-medium">{stats.alerts.info} alerts</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Most Common Alert</div>
                  <div className="text-xl font-medium">
                    {stats.alerts.critical > stats.alerts.warning && stats.alerts.critical > stats.alerts.info
                      ? "Critical: Engine Issues"
                      : stats.alerts.warning > stats.alerts.info
                        ? "Warning: Low Tire Pressure"
                        : "Info: Maintenance Due"}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button variant="outline" size="sm" leftIcon={<FileText size={16} />}>
                View Detailed Alerts Log
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Vehicle Health Report */}
      {filters.reportType === "all" && (
        <Card title="Vehicle Health Report">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Health Summary</h3>
              <Badge
                variant={
                  selectedVehicle.engineStatus === "normal"
                    ? "success"
                    : selectedVehicle.engineStatus === "warning"
                      ? "warning"
                      : "danger"
                }
                size="sm"
              >
                {selectedVehicle.engineStatus}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Gauge className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Vehicle health metrics would display here</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Engine Status</div>
                  <div className="text-xl font-medium capitalize">{selectedVehicle.engineStatus}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-1">Tire Health</div>
                  <div className="text-xl font-medium">
                    {Object.values(selectedVehicle.tirePressure).some((p) => p < 30 || p > 36)
                      ? "Check Required"
                      : "Good"}
                  </div>
                </div>

                {(selectedVehicle.fuelType === "electric" || selectedVehicle.fuelType === "hybrid") && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Battery Health</div>
                    <div className="text-xl font-medium">
                      {(selectedVehicle.batteryHealth || 0) > 80
                        ? "Good"
                        : (selectedVehicle.batteryHealth || 0) > 60
                          ? "Fair"
                          : "Poor"}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-sm text-gray-500 mb-1">Next Service Due</div>
                  <div className="text-xl font-medium">
                    {new Date(selectedVehicle.nextServiceDue).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Button variant="outline" size="sm" leftIcon={<FileText size={16} />}>
                View Full Health Report
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Schedule Reports */}
      <Card title="Schedule Reports">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Set up automated reports to be delivered to your email on a regular schedule.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Weekly Summary</h3>
              <p className="text-sm text-gray-500 mb-4">
                Receive a weekly summary of your vehicle's performance, fuel consumption, and alerts.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-sm">Every Monday at 9:00 AM</span>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Monthly Report</h3>
              <p className="text-sm text-gray-500 mb-4">
                Receive a detailed monthly report with comprehensive analytics and maintenance recommendations.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-sm">1st of each month</span>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" leftIcon={<Plus size={16} />} className="mt-2">
            Add New Scheduled Report
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Reports
