"use client"

import type React from "react"
import { useState } from "react"
import type { Vehicle } from "../types/vehicle"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import { AlertCircle, Phone, MapPin, Shield, User, MessageSquare, Zap, Plus } from "lucide-react"
import { mockUserProfile } from "../data/mockData"

interface EmergencyProps {
  selectedVehicle: Vehicle
}

const Emergency: React.FC<EmergencyProps> = ({ selectedVehicle }) => {
  const [emergencyStatus, setEmergencyStatus] = useState<"standby" | "contacting" | "contacted">("standby")
  const [countdown, setCountdown] = useState(5)

  // Simulate emergency call
  const initiateEmergencyCall = () => {
    setEmergencyStatus("contacting")

    // Simulate countdown
    let count = 5
    const timer = setInterval(() => {
      count -= 1
      setCountdown(count)

      if (count <= 0) {
        clearInterval(timer)
        setEmergencyStatus("contacted")
      }
    }, 1000)
  }

  // Cancel emergency call
  const cancelEmergencyCall = () => {
    setEmergencyStatus("standby")
    setCountdown(5)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Emergency Assistance</h1>
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${emergencyStatus === "standby" ? "bg-green-500 animate-pulse" : "bg-red-500 animate-pulse"}`}
          ></div>
          <span className="text-sm font-medium">
            {emergencyStatus === "standby"
              ? "System Ready"
              : emergencyStatus === "contacting"
                ? "Contacting Emergency Services..."
                : "Emergency Services Contacted"}
          </span>
        </div>
      </div>

      {/* Emergency Call Button */}
      <Card className="border-2 border-red-500">
        <div className="flex flex-col items-center py-6">
          {emergencyStatus === "standby" ? (
            <>
              <div className="w-32 h-32 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <AlertCircle className="w-16 h-16 text-red-500" />
              </div>
              <h2 className="text-xl font-bold mb-4">Emergency Assistance</h2>
              <p className="text-gray-600 mb-6 text-center max-w-md">
                Press the button below to contact emergency services. Your vehicle location and information will be
                shared automatically.
              </p>
              <Button variant="danger" size="lg" onClick={initiateEmergencyCall} className="px-8 py-4 text-lg">
                Contact Emergency Services
              </Button>
            </>
          ) : emergencyStatus === "contacting" ? (
            <>
              <div className="w-32 h-32 rounded-full bg-red-100 flex items-center justify-center mb-6 animate-pulse">
                <Phone className="w-16 h-16 text-red-500 animate-pulse" />
              </div>
              <h2 className="text-xl font-bold mb-4">Contacting Emergency Services</h2>
              <p className="text-gray-600 mb-6 text-center">Emergency call will be placed in {countdown} seconds...</p>
              <Button variant="outline" size="lg" onClick={cancelEmergencyCall} className="px-8">
                Cancel
              </Button>
            </>
          ) : (
            <>
              <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <Phone className="w-16 h-16 text-green-500" />
              </div>
              <h2 className="text-xl font-bold mb-4">Emergency Services Contacted</h2>
              <p className="text-gray-600 mb-6 text-center">
                Emergency services have been notified of your situation and location. Stay calm and wait for assistance.
              </p>
              <Button variant="outline" size="lg" onClick={() => setEmergencyStatus("standby")} className="px-8">
                Reset
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Vehicle Location */}
      <Card title="Your Current Location">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Map would display here</p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Current Address</div>
              <div className="text-lg font-medium">
                {selectedVehicle.location?.address || "123 Main St, San Francisco, CA"}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">GPS Coordinates</div>
              <div className="text-base">
                {selectedVehicle.location
                  ? `${selectedVehicle.location.latitude.toFixed(6)}, ${selectedVehicle.location.longitude.toFixed(6)}`
                  : "37.774929, -122.419416"}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Vehicle Information</div>
              <div className="text-base">
                {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
              </div>
              <div className="text-sm text-gray-500">License Plate: {selectedVehicle.licensePlate}</div>
            </div>

            <Button variant="outline" size="sm" leftIcon={<MessageSquare size={16} />} className="mt-2">
              Share Location
            </Button>
          </div>
        </div>
      </Card>

      {/* Emergency Contacts */}
      <Card title="Emergency Contacts">
        <div className="space-y-4">
          {mockUserProfile.emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="font-medium">{contact.name}</div>
                  <div className="text-sm text-gray-500">{contact.relationship}</div>
                </div>
              </div>
              <Button variant="outline" size="sm" leftIcon={<Phone size={16} />}>
                {contact.phone}
              </Button>
            </div>
          ))}

          <Button variant="outline" size="sm" leftIcon={<Plus size={16} />} className="w-full mt-2">
            Add Emergency Contact
          </Button>
        </div>
      </Card>

      {/* Roadside Assistance */}
      <Card title="Roadside Assistance">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Premium Roadside Assistance</div>
              <div className="text-sm text-gray-500 mb-2">Coverage active until Dec 31, 2023</div>
              <div className="flex space-x-2">
                <Button variant="primary" size="sm" leftIcon={<Phone size={16} />}>
                  Call Assistance
                </Button>
                <Button variant="outline" size="sm">
                  View Coverage Details
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <h4 className="font-medium mb-2">Services Included:</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <li className="flex items-center">
                <Zap className="w-4 h-4 text-green-500 mr-2" />
                <span>Battery Jump Start</span>
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 text-green-500 mr-2" />
                <span>Towing Service (up to 100 miles)</span>
              </li>
              <li className="flex items-center">
                <Shield className="w-4 h-4 text-green-500 mr-2" />
                <span>Flat Tire Assistance</span>
              </li>
              <li className="flex items-center">
                <Zap className="w-4 h-4 text-green-500 mr-2" />
                <span>Emergency Fuel Delivery</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Emergency
