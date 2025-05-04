"use client"

import type React from "react"
import { useState } from "react"
import type { Vehicle } from "../types/vehicle"
import { mockDiagnosticCodes } from "../data/mockData"
import Card from "../components/ui/Card"
import Badge from "../components/ui/Badge"
import Button from "../components/ui/Button"
import { AlertCircle, CheckCircle, Search, PenToolIcon as Tool, Filter, X, Download } from "lucide-react"

interface DiagnosticsProps {
  selectedVehicle: Vehicle
}

const Diagnostics: React.FC<DiagnosticsProps> = ({ selectedVehicle }) => {
  // Filter diagnostic codes for the selected vehicle
  const vehicleDiagnosticCodes = mockDiagnosticCodes.filter((code) => code.vehicleId === selectedVehicle.id)

  // State for diagnostic scan
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanComplete, setScanComplete] = useState(false)

  // State for filters
  const [filters, setFilters] = useState({
    severity: "all", // 'all', 'high', 'medium', 'low'
    status: "all", // 'all', 'active', 'resolved'
  })

  // Apply filters
  const filteredCodes = vehicleDiagnosticCodes.filter((code) => {
    if (filters.severity !== "all" && code.severity !== filters.severity) return false
    if (filters.status !== "all" && code.status !== filters.status) return false
    return true
  })

  // Start diagnostic scan
  const startDiagnosticScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    setScanComplete(false)

    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsScanning(false)
            setScanComplete(true)
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 500)
  }

  // Get severity badge variant
  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case "high":
        return "danger"
      case "medium":
        return "warning"
      case "low":
        return "primary"
      default:
        return "default"
    }
  }

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "danger"
      case "resolved":
        return "success"
      default:
        return "default"
    }
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Clear filters
  const clearFilters = () => {
    setFilters({
      severity: "all",
      status: "all",
    })
  }

  // Calculate system health score (mock calculation)
  const calculateHealthScore = () => {
    let score = 100

    // Deduct points for active diagnostic codes
    const activeCodes = vehicleDiagnosticCodes.filter((code) => code.status === "active")

    // Deduct based on severity
    const highSeverityCodes = activeCodes.filter((code) => code.severity === "high").length
    const mediumSeverityCodes = activeCodes.filter((code) => code.severity === "medium").length
    const lowSeverityCodes = activeCodes.filter((code) => code.severity === "low").length

    score -= highSeverityCodes * 15 + mediumSeverityCodes * 8 + lowSeverityCodes * 3

    // Ensure score is between 0 and 100
    return Math.max(0, Math.min(100, score))
  }

  const healthScore = calculateHealthScore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Diagnostics</h1>
        <div className="flex items-center space-x-2">
          <Badge variant={healthScore > 80 ? "success" : healthScore > 60 ? "warning" : "danger"} size="lg">
            System Health: {healthScore}%
          </Badge>
          <Button variant="outline" size="sm" leftIcon={<Download size={16} />}>
            Export Report
          </Button>
        </div>
      </div>

      {/* Diagnostic Scan */}
      <Card>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Search className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium">Diagnostic Scan</span>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {isScanning ? (
              <div className="flex-1 md:w-64">
                <div className="flex justify-between mb-1 text-xs">
                  <span>Scanning vehicle systems...</span>
                  <span>{scanProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : scanComplete ? (
              <div className="flex items-center text-green-500">
                <CheckCircle className="w-5 h-5 mr-1" />
                <span className="text-sm">Scan complete</span>
              </div>
            ) : null}

            <Button
              variant="primary"
              size="sm"
              onClick={startDiagnosticScan}
              disabled={isScanning}
              className="whitespace-nowrap"
            >
              {scanComplete ? "Scan Again" : "Run Diagnostic Scan"}
            </Button>
          </div>
        </div>
      </Card>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-2">Engine Systems</div>
            <div className="w-24 h-24 rounded-full border-8 border-green-500 flex items-center justify-center mb-2">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <div className="text-lg font-medium">Normal</div>
            <div className="text-sm text-gray-500">All systems operational</div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-2">Electrical Systems</div>
            <div className="w-24 h-24 rounded-full border-8 border-yellow-500 flex items-center justify-center mb-2">
              <AlertCircle className="w-10 h-10 text-yellow-500" />
            </div>
            <div className="text-lg font-medium">Warning</div>
            <div className="text-sm text-gray-500">1 issue detected</div>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center">
            <div className="text-gray-500 mb-2">Emissions Systems</div>
            <div className="w-24 h-24 rounded-full border-8 border-green-500 flex items-center justify-center mb-2">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <div className="text-lg font-medium">Normal</div>
            <div className="text-sm text-gray-500">All systems operational</div>
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
              value={filters.severity}
              onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
            >
              <option value="all">All Severities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
            </select>

            <Button variant="outline" size="sm" onClick={clearFilters} leftIcon={<X size={16} />}>
              Clear
            </Button>
          </div>
        </div>
      </Card>

      {/* Diagnostic Codes */}
      <div className="space-y-4">
        {filteredCodes.length > 0 ? (
          filteredCodes.map((code) => (
            <Card key={code.id}>
              <div className="flex items-start">
                <div className="mr-3">
                  {code.status === "active" ? (
                    <AlertCircle
                      className={`w-6 h-6 ${
                        code.severity === "high"
                          ? "text-red-500"
                          : code.severity === "medium"
                            ? "text-yellow-500"
                            : "text-blue-500"
                      }`}
                    />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">
                      Code {code.code}: {code.description}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                      <Badge variant={getSeverityBadgeVariant(code.severity)} size="sm">
                        {code.severity} severity
                      </Badge>
                      <Badge variant={getStatusBadgeVariant(code.status)} size="sm">
                        {code.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-2">
                    <h5 className="text-sm font-medium text-gray-500">Possible Causes:</h5>
                    <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                      {code.possibleCauses.map((cause, index) => (
                        <li key={index}>{cause}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-2">
                    <h5 className="text-sm font-medium text-gray-500">Recommended Action:</h5>
                    <p className="mt-1 text-sm text-gray-600">{code.recommendedAction}</p>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="text-sm text-gray-500">Detected: {formatDate(code.timestamp)}</div>

                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                      {code.status === "active" && (
                        <Button variant="primary" size="sm" leftIcon={<Tool size={16} />}>
                          Schedule Repair
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        {code.status === "active" ? "Mark as Resolved" : "Mark as Active"}
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
              <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-2" />
              <h3 className="text-lg font-medium text-gray-800">No Diagnostic Codes Found</h3>
              <p className="text-gray-500 mt-1">
                {vehicleDiagnosticCodes.length > 0
                  ? "Try adjusting your filters to see more diagnostic codes."
                  : "Your vehicle has no diagnostic codes at this time."}
              </p>
              {vehicleDiagnosticCodes.length > 0 && (filters.severity !== "all" || filters.status !== "all") && (
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

export default Diagnostics
