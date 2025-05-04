"use client"

import type React from "react"
import { useState } from "react"
import type { Vehicle } from "../types/vehicle"
import { mockAlerts, mockMaintenanceItems, mockTrips, mockWeatherData } from "../data/mockData"
import SpeedWidget from "../components/widgets/SpeedWidget"
import FuelWidget from "../components/widgets/FuelWidget"
import BatteryWidget from "../components/widgets/BatteryWidget"
import TirePressureWidget from "../components/widgets/TirePressureWidget"
import AlertsWidget from "../components/widgets/AlertsWidget"
import MaintenanceWidget from "../components/widgets/MaintenanceWidget"
import WeatherWidget from "../components/widgets/WeatherWidget"
import TripsWidget from "../components/widgets/TripsWidget"

interface DashboardProps {
  selectedVehicle: Vehicle
}

const Dashboard: React.FC<DashboardProps> = ({ selectedVehicle }) => {
  // Mock current speed (would come from real-time data)
  const [currentSpeed] = useState(45)

  // Filter alerts, maintenance items, and trips for the selected vehicle
  const vehicleAlerts = mockAlerts.filter((alert) => alert.vehicleId === selectedVehicle.id)
  const vehicleMaintenanceItems = mockMaintenanceItems.filter((item) => item.vehicleId === selectedVehicle.id)
  const vehicleTrips = mockTrips.filter((trip) => trip.vehicleId === selectedVehicle.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SpeedWidget currentSpeed={currentSpeed} maxSpeed={120} />

        {selectedVehicle.fuelType === "electric" ? (
          <BatteryWidget
            batteryLevel={selectedVehicle.batteryLevel || 0}
            batteryHealth={selectedVehicle.batteryHealth}
            estimatedRange={280}
          />
        ) : selectedVehicle.fuelType === "hybrid" ? (
          <div className="grid grid-rows-2 gap-2 h-full">
            <FuelWidget fuelLevel={selectedVehicle.fuelLevel} fuelType={selectedVehicle.fuelType} range={350} />
            <BatteryWidget
              batteryLevel={selectedVehicle.batteryLevel || 0}
              batteryHealth={selectedVehicle.batteryHealth}
            />
          </div>
        ) : (
          <FuelWidget fuelLevel={selectedVehicle.fuelLevel} fuelType={selectedVehicle.fuelType} range={400} />
        )}

        <TirePressureWidget tirePressure={selectedVehicle.tirePressure} />

        <AlertsWidget alerts={vehicleAlerts} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MaintenanceWidget maintenanceItems={vehicleMaintenanceItems} />
        <WeatherWidget weatherData={mockWeatherData} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <TripsWidget trips={vehicleTrips} />
      </div>
    </div>
  )
}

export default Dashboard
