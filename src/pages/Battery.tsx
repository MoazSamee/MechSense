"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Vehicle } from "../types/vehicle"
import Card from "../components/ui/Card"
import { BatteryIcon, AlertTriangle, Zap, Clock, Calendar, BarChart2 } from "lucide-react"
import Badge from "../components/ui/Badge"

interface BatteryProps {
  selectedVehicle: Vehicle
}

const Battery: React.FC<BatteryProps> = ({ selectedVehicle }) => {
  // Check if vehicle is electric or hybrid
  const isElectricOrHybrid = selectedVehicle.fuelType === "electric" || selectedVehicle.fuelType === "hybrid"

  // Mock battery data
  const [batteryData, setBatteryData] = useState({
    voltage: 12.6, // For non-electric vehicles
    temperature: 75, // Fahrenheit
    chargingStatus: "idle" as "charging" | "discharging" | "idle",
    lastFullCharge: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    estimatedRange: isElectricOrHybrid ? 280 : 0, // miles
    chargingRate: 0, // kW
    timeToFullCharge: 0, // minutes
    cycleCount: isElectricOrHybrid ? 127 : 0,
    batteryCapacity: isElectricOrHybrid ? 75 : 0, // kWh
    degradation: isElectricOrHybrid ? 5 : 0, // percentage
    cellVoltages: Array(10)
      .fill(0)
      .map(() => 3.7 + Math.random() * 0.3), // Volts
  })

  // Simulate battery discharging
  useEffect(() => {
    if (!isElectricOrHybrid) return

    const interval = setInterval(() => {
      setBatteryData((prev) => {
        // Randomly change charging status
        const randomStatus = Math.random()
        let newStatus: "charging" | "discharging" | "idle" = prev.chargingStatus

        if (randomStatus < 0.1) {
          newStatus = "charging"
        } else if (randomStatus < 0.6) {
          newStatus = "discharging"
        } else {
          newStatus = "idle"
        }

        // Update battery level based on status
        let newBatteryLevel = selectedVehicle.batteryLevel || 0
        if (newStatus === "charging" && newBatteryLevel < 100) {
          newBatteryLevel = Math.min(100, newBatteryLevel + 0.5)
        } else if (newStatus === "discharging" && newBatteryLevel > 0) {
          newBatteryLevel = Math.max(0, newBatteryLevel - 0.2)
        }

        return {
          ...prev,
          chargingStatus: newStatus,
          chargingRate: newStatus === "charging" ? 7.2 : 0,
          timeToFullCharge: newStatus === "charging" ? Math.round(((100 - newBatteryLevel) / 0.5) * 60) : 0,
          estimatedRange: Math.round(newBatteryLevel * 3.5), // Simple calculation
        }
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isElectricOrHybrid, selectedVehicle.batteryLevel])

  // Get battery health status
  const getBatteryHealthStatus = () => {
    const health = selectedVehicle.batteryHealth || 0
    if (health >= 90) return { status: "Excellent", color: "text-green-500" }
    if (health >= 80) return { status: "Good", color: "text-green-400" }
    if (health >= 70) return { status: "Fair", color: "text-yellow-500" }
    if (health >= 60) return { status: "Poor", color: "text-orange-500" }
    return { status: "Critical", color: "text-red-500" }
  }

  // Get charging status text and icon
  const getChargingStatus = () => {
    switch (batteryData.chargingStatus) {
      case "charging":
        return { text: "Charging", icon: <Zap className="w-5 h-5 text-green-500" /> }
      case "discharging":
        return { text: "Discharging", icon: <Zap className="w-5 h-5 text-yellow-500" /> }
      default:
        return { text: "Idle", icon: <Clock className="w-5 h-5 text-gray-500" /> }
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

  // If vehicle is not electric or hybrid, show limited information
  if (!isElectricOrHybrid) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Battery Status</h1>
          <Badge variant="warning" size="lg">
            Conventional Battery
          </Badge>
        </div>

        <Card>
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">Limited Battery Information</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-4">
              This vehicle has a conventional 12V battery, not an electric or hybrid high-voltage battery system.
              Limited monitoring capabilities are available.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-6">
              <div className="flex flex-col items-center">
                <BatteryIcon className="w-8 h-8 text-blue-500 mb-2" />
                <div className="text-sm text-gray-500">Battery Voltage</div>
                <div className="text-2xl font-bold">{batteryData.voltage}V</div>
                <div className="text-sm text-green-500">Normal</div>
              </div>

              <div className="flex flex-col items-center">
                <Calendar className="w-8 h-8 text-blue-500 mb-2" />
                <div className="text-sm text-gray-500">Battery Age</div>
                <div className="text-2xl font-bold">2 years</div>
                <div className="text-sm text-green-500">Good Condition</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Battery Status</h1>
        <Badge
          variant={
            (selectedVehicle.batteryHealth || 0) > 80
              ? "success"
              : (selectedVehicle.batteryHealth || 0) > 60
                ? "warning"
                : "danger"
          }
          size="lg"
        >
          Health: {selectedVehicle.batteryHealth}%
        </Badge>
      </div>

      {/* Battery Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Battery Overview">
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-4">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={
                    (selectedVehicle.batteryLevel || 0) > 50
                      ? "#10b981"
                      : (selectedVehicle.batteryLevel || 0) > 20
                        ? "#f59e0b"
                        : "#ef4444"
                  }
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(selectedVehicle.batteryLevel || 0) * 2.83} 283`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
                {/* Battery level text */}
                <text x="50" y="45" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="bold">
                  {selectedVehicle.batteryLevel}%
                </text>
                <text x="50" y="65" textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#6b7280">
                  CHARGE
                </text>
              </svg>

              {/* Charging indicator */}
              {batteryData.chargingStatus === "charging" && (
                <div className="absolute top-0 right-0 bg-green-500 text-white p-1 rounded-full">
                  <Zap className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="flex items-center mb-2">
              {getChargingStatus().icon}
              <span className="ml-2 font-medium">{getChargingStatus().text}</span>
            </div>

            <div className="text-2xl font-bold mb-1">{batteryData.estimatedRange} miles</div>
            <div className="text-sm text-gray-500 mb-4">Estimated Range</div>

            {batteryData.chargingStatus === "charging" && (
              <div className="bg-green-50 text-green-800 px-4 py-2 rounded-md text-sm">
                <div className="font-medium">Charging at {batteryData.chargingRate} kW</div>
                <div>
                  Full charge in {Math.floor(batteryData.timeToFullCharge / 60)}h {batteryData.timeToFullCharge % 60}m
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card title="Battery Health">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">Health Status</div>
              <div className={`text-lg font-medium ${getBatteryHealthStatus().color}`}>
                {getBatteryHealthStatus().status}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <div className="text-sm text-gray-500">Battery Health</div>
                <div className="text-sm font-medium">{selectedVehicle.batteryHealth}%</div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    (selectedVehicle.batteryHealth || 0) > 80
                      ? "bg-green-500"
                      : (selectedVehicle.batteryHealth || 0) > 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${selectedVehicle.batteryHealth}%` }}
                ></div>
              </div>
              <div className="mt-1 text-xs text-gray-500">{batteryData.degradation}% degradation since new</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Battery Capacity</div>
                <div className="text-lg font-medium">{batteryData.batteryCapacity} kWh</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Charge Cycles</div>
                <div className="text-lg font-medium">{batteryData.cycleCount}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Temperature</div>
                <div className="text-lg font-medium">{batteryData.temperature}°F</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Last Full Charge</div>
                <div className="text-lg font-medium">{formatDate(batteryData.lastFullCharge)}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Cell Voltages */}
      <Card title="Cell Voltages">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">Cell Balance</div>
            <Badge variant="success" size="sm">
              Normal
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {batteryData.cellVoltages.map((voltage, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-md">
                <div className="text-xs text-gray-500">Cell {index + 1}</div>
                <div className="text-lg font-medium">{voltage.toFixed(2)}V</div>
              </div>
            ))}
          </div>

          <div className="text-sm text-gray-500 mt-2">Cell voltage variance: 0.12V (within normal range)</div>
        </div>
      </Card>

      {/* Battery Tips */}
      <Card title="Battery Care Tips">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <BatteryIcon className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Optimal Charging</h4>
              <p className="text-sm text-gray-600">
                For daily use, keep the battery between 20% and 80% to maximize battery life.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <BarChart2 className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Temperature Management</h4>
              <p className="text-sm text-gray-600">
                Avoid extreme temperatures when possible. Park in shade during hot weather.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Regular Usage</h4>
              <p className="text-sm text-gray-600">
                Use your vehicle regularly. Long periods of inactivity can reduce battery health.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Battery
