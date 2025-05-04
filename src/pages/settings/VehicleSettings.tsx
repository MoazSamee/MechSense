"use client"

import type React from "react"
import { useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { Car, Edit, Plus, Save, Trash } from "lucide-react"
import { mockVehicles } from "../../data/mockData"
import type { Vehicle } from "../../types/vehicle"

const VehicleSettings: React.FC = () => {
  // State for vehicles
  const [vehicles, setVehicles] = useState<Vehicle[]>([...mockVehicles])
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const [isAddingVehicle, setIsAddingVehicle] = useState(false)

  // New vehicle template
  const newVehicleTemplate: Omit<Vehicle, "id"> = {
    name: "",
    make: "",
    model: "",
    year: new Date().getFullYear(),
    licensePlate: "",
    fuelType: "gasoline",
    fuelLevel: 100,
    mileage: 0,
    lastService: new Date(),
    nextServiceDue: new Date(),
    nextServiceMileage: 5000,
    tirePressure: {
      frontLeft: 32,
      frontRight: 32,
      rearLeft: 32,
      rearRight: 32,
    },
    engineStatus: "normal",
    image: "/placeholder.svg?height=200&width=300",
  }

  // Save settings
  const saveSettings = () => {
    // In a real app, this would save to the backend
    alert("Vehicle settings saved successfully!")
  }

  // Start editing a vehicle
  const startEditingVehicle = (vehicle: Vehicle) => {
    setEditingVehicle({ ...vehicle })
    setIsAddingVehicle(false)
  }

  // Start adding a new vehicle
  const startAddingVehicle = () => {
    setEditingVehicle({ ...newVehicleTemplate, id: `new-${Date.now()}` } as Vehicle)
    setIsAddingVehicle(true)
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingVehicle(null)
    setIsAddingVehicle(false)
  }

  // Save vehicle changes
  const saveVehicleChanges = () => {
    if (!editingVehicle) return

    if (isAddingVehicle) {
      // Add new vehicle
      setVehicles([...vehicles, editingVehicle])
    } else {
      // Update existing vehicle
      setVehicles(vehicles.map((v) => (v.id === editingVehicle.id ? editingVehicle : v)))
    }

    setEditingVehicle(null)
    setIsAddingVehicle(false)
  }

  // Delete vehicle
  const deleteVehicle = (vehicleId: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      setVehicles(vehicles.filter((v) => v.id !== vehicleId))
    }
  }

  // Handle input change for editing vehicle
  const handleInputChange = (field: keyof Vehicle, value: any) => {
    if (!editingVehicle) return

    if (field === "tirePressure") {
      setEditingVehicle({
        ...editingVehicle,
        tirePressure: { ...editingVehicle.tirePressure, ...value },
      })
    } else {
      setEditingVehicle({
        ...editingVehicle,
        [field]: value,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Vehicle Settings</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" leftIcon={<Plus size={16} />} onClick={startAddingVehicle}>
            Add Vehicle
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Save size={16} />} onClick={saveSettings}>
            Save Changes
          </Button>
        </div>
      </div>

      {/* Vehicle List */}
      <Card title="Your Vehicles">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Manage your vehicles. You can add, edit, or remove vehicles from your account.
          </p>

          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <img
                    src={vehicle.image || "/placeholder.svg?height=200&width=300"}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-16 h-12 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{vehicle.name}</h3>
                    <p className="text-sm text-gray-500">
                      {vehicle.year} {vehicle.make} {vehicle.model} • {vehicle.licensePlate}
                    </p>
                    <p className="text-sm text-gray-500">Mileage: {vehicle.mileage.toLocaleString()} miles</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Edit size={16} />}
                    onClick={() => startEditingVehicle(vehicle)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    leftIcon={<Trash size={16} />}
                    onClick={() => deleteVehicle(vehicle.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}

            {vehicles.length === 0 && (
              <div className="text-center py-8">
                <Car className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <h3 className="text-lg font-medium text-gray-800">No Vehicles Added</h3>
                <p className="text-gray-500 mt-1">Add your first vehicle to get started.</p>
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-4"
                  leftIcon={<Plus size={16} />}
                  onClick={startAddingVehicle}
                >
                  Add Vehicle
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Edit Vehicle Form */}
      {editingVehicle && (
        <Card title={isAddingVehicle ? "Add New Vehicle" : "Edit Vehicle"}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={editingVehicle.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="My Car"
                />
              </div>

              <div>
                <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-1">
                  License Plate
                </label>
                <input
                  type="text"
                  id="licensePlate"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={editingVehicle.licensePlate}
                  onChange={(e) => handleInputChange("licensePlate", e.target.value)}
                  placeholder="ABC-1234"
                />
              </div>

              <div>
                <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
                  Make
                </label>
                <input
                  type="text"
                  id="make"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={editingVehicle.make}
                  onChange={(e) => handleInputChange("make", e.target.value)}
                  placeholder="Toyota"
                />
              </div>

              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                  Model
                </label>
                <input
                  type="text"
                  id="model"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={editingVehicle.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  placeholder="Camry"
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  id="year"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={editingVehicle.year}
                  onChange={(e) => handleInputChange("year", Number.parseInt(e.target.value))}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                />
              </div>

              <div>
                <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  id="fuelType"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={editingVehicle.fuelType}
                  onChange={(e) => handleInputChange("fuelType", e.target.value)}
                >
                  <option value="gasoline">Gasoline</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Mileage
                </label>
                <input
                  type="number"
                  id="mileage"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={editingVehicle.mileage}
                  onChange={(e) => handleInputChange("mileage", Number.parseInt(e.target.value))}
                  min="0"
                />
              </div>

              <div>
                <label htmlFor="lastService" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Service Date
                </label>
                <input
                  type="date"
                  id="lastService"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={new Date(editingVehicle.lastService).toISOString().split("T")[0]}
                  onChange={(e) => handleInputChange("lastService", new Date(e.target.value))}
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium mb-4">Tire Pressure (PSI)</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="frontLeft" className="block text-sm font-medium text-gray-700 mb-1">
                    Front Left
                  </label>
                  <input
                    type="number"
                    id="frontLeft"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={editingVehicle.tirePressure.frontLeft}
                    onChange={(e) => handleInputChange("tirePressure", { frontLeft: Number.parseInt(e.target.value) })}
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label htmlFor="frontRight" className="block text-sm font-medium text-gray-700 mb-1">
                    Front Right
                  </label>
                  <input
                    type="number"
                    id="frontRight"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={editingVehicle.tirePressure.frontRight}
                    onChange={(e) => handleInputChange("tirePressure", { frontRight: Number.parseInt(e.target.value) })}
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label htmlFor="rearLeft" className="block text-sm font-medium text-gray-700 mb-1">
                    Rear Left
                  </label>
                  <input
                    type="number"
                    id="rearLeft"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={editingVehicle.tirePressure.rearLeft}
                    onChange={(e) => handleInputChange("tirePressure", { rearLeft: Number.parseInt(e.target.value) })}
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label htmlFor="rearRight" className="block text-sm font-medium text-gray-700 mb-1">
                    Rear Right
                  </label>
                  <input
                    type="number"
                    id="rearRight"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    value={editingVehicle.tirePressure.rearRight}
                    onChange={(e) => handleInputChange("tirePressure", { rearRight: Number.parseInt(e.target.value) })}
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            {(editingVehicle.fuelType === "electric" || editingVehicle.fuelType === "hybrid") && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium mb-4">Battery Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="batteryLevel" className="block text-sm font-medium text-gray-700 mb-1">
                      Battery Level (%)
                    </label>
                    <input
                      type="number"
                      id="batteryLevel"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={editingVehicle.batteryLevel || 0}
                      onChange={(e) => handleInputChange("batteryLevel", Number.parseInt(e.target.value))}
                      min="0"
                      max="100"
                    />
                  </div>

                  <div>
                    <label htmlFor="batteryHealth" className="block text-sm font-medium text-gray-700 mb-1">
                      Battery Health (%)
                    </label>
                    <input
                      type="number"
                      id="batteryHealth"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={editingVehicle.batteryHealth || 0}
                      onChange={(e) => handleInputChange("batteryHealth", Number.parseInt(e.target.value))}
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={cancelEditing}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={saveVehicleChanges}>
                {isAddingVehicle ? "Add Vehicle" : "Save Changes"}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Vehicle Connection */}
      <Card title="Vehicle Connection">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Connect your vehicle to MechSense for real-time data and enhanced features.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">OBD-II Connection</h3>
              <p className="text-sm text-gray-500 mb-4">
                Connect using an OBD-II adapter to get real-time diagnostic data from your vehicle.
              </p>
              <Button variant="outline" size="sm">
                Set Up OBD-II Connection
              </Button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Manufacturer API</h3>
              <p className="text-sm text-gray-500 mb-4">
                Connect to your vehicle manufacturer's API for enhanced features and data.
              </p>
              <Button variant="outline" size="sm">
                Connect to Manufacturer
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" size="md" leftIcon={<Save size={16} />} onClick={saveSettings}>
          Save All Changes
        </Button>
      </div>
    </div>
  )
}

export default VehicleSettings
