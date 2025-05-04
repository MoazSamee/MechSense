"use client"

import type React from "react"
import { useState } from "react"
import type { Vehicle } from "../types/vehicle"
import Card from "../components/ui/Card"
import { Gauge, AlertTriangle, ThermometerIcon, Calendar } from "lucide-react"
import Button from "../components/ui/Button"

interface TirePressureProps {
  selectedVehicle: Vehicle
}

const TirePressure: React.FC<TirePressureProps> = ({ selectedVehicle }) => {
  // Recommended tire pressure
  const [recommendedPressure] = useState(32) // PSI

  // Tire temperature (mock data)
  const [tireTemperature] = useState({
    frontLeft: 75,
    frontRight: 77,
    rearLeft: 74,
    rearRight: 76,
  })

  // Last tire rotation (mock data)
  const [lastTireRotation] = useState(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)) // 60 days ago

  // Tire wear percentage (mock data)
  const [tireWear] = useState({
    frontLeft: 15,
    frontRight: 18,
    rearLeft: 12,
    rearRight: 14,
  })

  // Function to determine if pressure is low or high
  const getPressureStatus = (pressure: number) => {
    const lowThreshold = recommendedPressure - 5
    const highThreshold = recommendedPressure + 5

    if (pressure < lowThreshold) return "low"
    if (pressure > highThreshold) return "high"
    return "normal"
  }

  // Function to get color based on pressure status
  const getPressureColor = (pressure: number) => {
    const status = getPressureStatus(pressure)
    if (status === "normal") return "text-green-500"
    if (status === "low") return "text-red-500"
    return "text-yellow-500"
  }

  // Function to get background color based on pressure status
  const getPressureBgColor = (pressure: number) => {
    const status = getPressureStatus(pressure)
    if (status === "normal") return "bg-green-100"
    if (status === "low") return "bg-red-100"
    return "bg-yellow-100"
  }

  // Function to get message based on pressure status
  const getPressureMessage = (pressure: number) => {
    const status = getPressureStatus(pressure)
    if (status === "normal") return "Normal"
    if (status === "low") return "Low - Inflate Soon"
    return "High - Reduce Pressure"
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Calculate days since last rotation
  const daysSinceRotation = Math.floor((Date.now() - lastTireRotation.getTime()) / (1000 * 60 * 60 * 24))

  // Determine if rotation is needed
  const rotationNeeded = daysSinceRotation > 180 // Every 6 months or 6,000-8,000 miles

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Tire Pressure</h1>
        <Button variant="primary" size="sm" leftIcon={<Gauge size={16} />}>
          Calibrate Sensors
        </Button>
      </div>

      {/* Tire Pressure Overview */}
      <Card title="Tire Pressure Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Car diagram */}
          <div className="relative flex items-center justify-center">
            <div className="w-64 h-32 border-2 border-gray-300 rounded-lg relative">
              {/* Car body */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Vehicle Top View</span>
              </div>

              {/* Front left tire */}
              <div
                className={`absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center ${getPressureBgColor(selectedVehicle.tirePressure.frontLeft)}`}
              >
                <div className="text-center">
                  <div className={`text-lg font-bold ${getPressureColor(selectedVehicle.tirePressure.frontLeft)}`}>
                    {selectedVehicle.tirePressure.frontLeft}
                  </div>
                  <div className="text-xs">PSI</div>
                </div>
              </div>

              {/* Front right tire */}
              <div
                className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center ${getPressureBgColor(selectedVehicle.tirePressure.frontRight)}`}
              >
                <div className="text-center">
                  <div className={`text-lg font-bold ${getPressureColor(selectedVehicle.tirePressure.frontRight)}`}>
                    {selectedVehicle.tirePressure.frontRight}
                  </div>
                  <div className="text-xs">PSI</div>
                </div>
              </div>

              {/* Rear left tire */}
              <div
                className={`absolute bottom-4 left-4 w-12 h-12 rounded-full flex items-center justify-center ${getPressureBgColor(selectedVehicle.tirePressure.rearLeft)}`}
              >
                <div className="text-center">
                  <div className={`text-lg font-bold ${getPressureColor(selectedVehicle.tirePressure.rearLeft)}`}>
                    {selectedVehicle.tirePressure.rearLeft}
                  </div>
                  <div className="text-xs">PSI</div>
                </div>
              </div>

              {/* Rear right tire */}
              <div
                className={`absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center ${getPressureBgColor(selectedVehicle.tirePressure.rearRight)}`}
              >
                <div className="text-center">
                  <div className={`text-lg font-bold ${getPressureColor(selectedVehicle.tirePressure.rearRight)}`}>
                    {selectedVehicle.tirePressure.rearRight}
                  </div>
                  <div className="text-xs">PSI</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pressure status */}
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-sm text-gray-500">Recommended Pressure</div>
              <div className="text-xl font-bold">{recommendedPressure} PSI</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Front Left</div>
                <div className="flex items-center">
                  <div className={`text-lg font-medium ${getPressureColor(selectedVehicle.tirePressure.frontLeft)}`}>
                    {selectedVehicle.tirePressure.frontLeft} PSI
                  </div>
                  {getPressureStatus(selectedVehicle.tirePressure.frontLeft) !== "normal" && (
                    <AlertTriangle className="ml-1 w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {getPressureMessage(selectedVehicle.tirePressure.frontLeft)}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Front Right</div>
                <div className="flex items-center">
                  <div className={`text-lg font-medium ${getPressureColor(selectedVehicle.tirePressure.frontRight)}`}>
                    {selectedVehicle.tirePressure.frontRight} PSI
                  </div>
                  {getPressureStatus(selectedVehicle.tirePressure.frontRight) !== "normal" && (
                    <AlertTriangle className="ml-1 w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {getPressureMessage(selectedVehicle.tirePressure.frontRight)}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Rear Left</div>
                <div className="flex items-center">
                  <div className={`text-lg font-medium ${getPressureColor(selectedVehicle.tirePressure.rearLeft)}`}>
                    {selectedVehicle.tirePressure.rearLeft} PSI
                  </div>
                  {getPressureStatus(selectedVehicle.tirePressure.rearLeft) !== "normal" && (
                    <AlertTriangle className="ml-1 w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="text-xs text-gray-500">{getPressureMessage(selectedVehicle.tirePressure.rearLeft)}</div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Rear Right</div>
                <div className="flex items-center">
                  <div className={`text-lg font-medium ${getPressureColor(selectedVehicle.tirePressure.rearRight)}`}>
                    {selectedVehicle.tirePressure.rearRight} PSI
                  </div>
                  {getPressureStatus(selectedVehicle.tirePressure.rearRight) !== "normal" && (
                    <AlertTriangle className="ml-1 w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {getPressureMessage(selectedVehicle.tirePressure.rearRight)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tire Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Tire Temperature">
          <div className="space-y-4">
            <div className="text-sm text-gray-500 mb-2">
              Current tire temperatures are within normal operating range.
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Front Left</div>
                <div className="flex items-center">
                  <ThermometerIcon className="w-4 h-4 text-blue-500 mr-1" />
                  <div className="text-lg font-medium">{tireTemperature.frontLeft}°F</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Front Right</div>
                <div className="flex items-center">
                  <ThermometerIcon className="w-4 h-4 text-blue-500 mr-1" />
                  <div className="text-lg font-medium">{tireTemperature.frontRight}°F</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Rear Left</div>
                <div className="flex items-center">
                  <ThermometerIcon className="w-4 h-4 text-blue-500 mr-1" />
                  <div className="text-lg font-medium">{tireTemperature.rearLeft}°F</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Rear Right</div>
                <div className="flex items-center">
                  <ThermometerIcon className="w-4 h-4 text-blue-500 mr-1" />
                  <div className="text-lg font-medium">{tireTemperature.rearRight}°F</div>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-2">Normal operating range: 70°F - 100°F</div>
          </div>
        </Card>

        <Card title="Tire Wear">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">Last Rotation</div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-sm">{formatDate(lastTireRotation)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">Days Since Rotation</div>
              <div className="flex items-center">
                <span className="text-sm font-medium">{daysSinceRotation} days</span>
                {rotationNeeded && <AlertTriangle className="ml-1 w-4 h-4 text-yellow-500" />}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-sm text-gray-500">Front Left Wear</div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-blue-500" style={{ width: `${tireWear.frontLeft}%` }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{tireWear.frontLeft}% worn</div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Front Right Wear</div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-blue-500" style={{ width: `${tireWear.frontRight}%` }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{tireWear.frontRight}% worn</div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Rear Left Wear</div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-blue-500" style={{ width: `${tireWear.rearLeft}%` }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{tireWear.rearLeft}% worn</div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Rear Right Wear</div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-blue-500" style={{ width: `${tireWear.rearRight}%` }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{tireWear.rearRight}% worn</div>
              </div>
            </div>

            <div className="mt-4">
              {rotationNeeded ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">Tire Rotation Recommended</h4>
                      <p className="text-xs text-yellow-700 mt-1">
                        It's been {daysSinceRotation} days since your last tire rotation. We recommend rotating your
                        tires every 6 months or 6,000-8,000 miles.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-md">
                  <div className="flex items-start">
                    <Gauge className="w-5 h-5 text-green-500 mr-2" />
                    <div>
                      <h4 className="text-sm font-medium text-green-800">Tire Rotation Status</h4>
                      <p className="text-xs text-green-700 mt-1">
                        Your last tire rotation was {daysSinceRotation} days ago. Next rotation recommended in{" "}
                        {180 - daysSinceRotation} days.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Tire Pressure Tips */}
      <Card title="Tire Pressure Tips">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Gauge className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Check Regularly</h4>
              <p className="text-sm text-gray-600">Check tire pressure at least once a month and before long trips.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <ThermometerIcon className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Temperature Effects</h4>
              <p className="text-sm text-gray-600">
                Tire pressure can decrease about 1 PSI for every 10°F drop in temperature.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Rotation Schedule</h4>
              <p className="text-sm text-gray-600">
                Rotate your tires every 6,000-8,000 miles or every 6 months to ensure even wear.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default TirePressure
