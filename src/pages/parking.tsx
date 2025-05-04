"use client"

import type React from "react"
import { useState } from "react"
import type { Vehicle } from "../types/vehicle"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import { Car, Clock, MapPin, Navigation, Plus, Save, Search } from "lucide-react"
import Badge from "../components/ui/Badge"

interface ParkingProps {
  selectedVehicle: Vehicle
}

const Parking: React.FC<ParkingProps> = ({ selectedVehicle }) => {
  // State for parking location
  const [parkingLocation, setParkingLocation] = useState({
    address: "350 5th Ave, New York, NY 10118",
    latitude: 40.748817,
    longitude: -73.985428,
    timestamp: new Date(),
    notes: "Parked on Level 2, Section B, Spot 45",
    reminder: true,
    reminderTime: "2023-12-15T18:00",
  })

  // State for parking history
  const [parkingHistory] = useState([
    {
      id: "1",
      address: "123 Main St, San Francisco, CA",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      duration: "2h 15m",
    },
    {
      id: "2",
      address: "456 Market St, San Francisco, CA",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      duration: "1h 30m",
    },
    {
      id: "3",
      address: "789 Mission St, San Francisco, CA",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      duration: "4h 45m",
    },
  ])

  // State for saved locations
  const [savedLocations] = useState([
    {
      id: "1",
      name: "Home",
      address: "123 Home St, San Francisco, CA",
      notes: "Garage spot #2",
    },
    {
      id: "2",
      name: "Work",
      address: "456 Office Blvd, San Francisco, CA",
      notes: "Parking level B, spot 42",
    },
    {
      id: "3",
      name: "Gym",
      address: "789 Fitness Ave, San Francisco, CA",
      notes: "Street parking, 2 hour limit",
    },
  ])

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Format time
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Handle input change for parking location
  const handleInputChange = (field: keyof typeof parkingLocation, value: any) => {
    setParkingLocation({
      ...parkingLocation,
      [field]: value,
    })
  }

  // Save parking location
  const saveParkingLocation = () => {
    // In a real app, this would save to the backend
    alert("Parking location saved successfully!")
  }

  // Navigate to parking location
  const navigateToParkingLocation = () => {
    // In a real app, this would open maps app with directions
    alert("Opening navigation to parking location...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Parking Location</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" leftIcon={<Search size={16} />}>
            Find Parking
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Save size={16} />} onClick={saveParkingLocation}>
            Save Location
          </Button>
        </div>
      </div>

      {/* Current Parking Location */}
      <Card title="Current Parking Location">
        <div className="flex flex-col md:flex-row gap-6">
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
              <div className="text-sm text-gray-500 mb-1">Address</div>
              <div className="text-lg font-medium">{parkingLocation.address}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Parked On</div>
                <div className="text-base">{formatDate(parkingLocation.timestamp)}</div>
                <div className="text-sm text-gray-500">{formatTime(parkingLocation.timestamp)}</div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1">GPS Coordinates</div>
                <div className="text-base">
                  {parkingLocation.latitude.toFixed(6)}, {parkingLocation.longitude.toFixed(6)}
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500 mb-1">Notes</div>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                rows={2}
                value={parkingLocation.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="reminder"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={parkingLocation.reminder}
                  onChange={(e) => handleInputChange("reminder", e.target.checked)}
                />
                <label htmlFor="reminder" className="ml-2 block text-sm text-gray-700">
                  Set reminder
                </label>
              </div>

              {parkingLocation.reminder && (
                <input
                  type="datetime-local"
                  className="border border-gray-300 rounded-md p-1 text-sm"
                  value={parkingLocation.reminderTime}
                  onChange={(e) => handleInputChange("reminderTime", e.target.value)}
                />
              )}
            </div>

            <div className="flex space-x-2 pt-2">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Navigation size={16} />}
                onClick={navigateToParkingLocation}
                className="w-full"
              >
                Navigate to Car
              </Button>
              <Button variant="outline" size="sm" leftIcon={<Save size={16} />} className="w-full">
                Save as Favorite
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Parking History */}
      <Card title="Parking History">
        <div className="space-y-4">
          {parkingHistory.map((location) => (
            <div key={location.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Car className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="font-medium">{location.address}</div>
                  <div className="text-sm text-gray-500">
                    {formatDate(location.timestamp)} at {formatTime(location.timestamp)}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Badge variant="secondary" size="sm" className="mr-2">
                  {location.duration}
                </Badge>
                <Button variant="outline" size="sm" leftIcon={<Navigation size={16} />}>
                  Navigate
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Saved Locations */}
      <Card title="Saved Locations">
        <div className="space-y-4">
          {savedLocations.map((location) => (
            <div key={location.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <MapPin className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="font-medium">{location.name}</div>
                  <div className="text-sm text-gray-500">{location.address}</div>
                  <div className="text-xs text-gray-500">{location.notes}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Button variant="outline" size="sm" leftIcon={<Navigation size={16} />}>
                  Navigate
                </Button>
              </div>
            </div>
          ))}

          <Button variant="outline" size="sm" leftIcon={<Plus size={16} />} className="w-full">
            Add Saved Location
          </Button>
        </div>
      </Card>

      {/* Nearby Parking */}
      <Card title="Nearby Parking Options">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">Find parking garages and lots near your destination</div>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter destination"
                className="border border-gray-300 rounded-md p-2 text-sm mr-2"
              />
              <Button variant="primary" size="sm" leftIcon={<Search size={16} />}>
                Search
              </Button>
            </div>
          </div>

          <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Nearby parking options would display here</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="font-medium">Downtown Garage</div>
              <div className="text-sm text-gray-500">0.2 miles away</div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">Open 24/7</span>
                </div>
                <Badge variant="success" size="sm">
                  $15/hr
                </Badge>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-3">
              <div className="font-medium">City Center Parking</div>
              <div className="text-sm text-gray-500">0.5 miles away</div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">6AM - 10PM</span>
                </div>
                <Badge variant="success" size="sm">
                  $12/hr
                </Badge>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-3">
              <div className="font-medium">Street Parking</div>
              <div className="text-sm text-gray-500">0.1 miles away</div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">2hr limit</span>
                </div>
                <Badge variant="success" size="sm">
                  $2/hr
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Parking
