"use client"

import type React from "react"
import { useState } from "react"
import type { Vehicle } from "../types/vehicle"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import { AlertCircle, Clock, Edit, Gauge, MapPin, Plus, Trash } from "lucide-react"
import Badge from "../components/ui/Badge"

interface SpeedAlertsProps {
  selectedVehicle: Vehicle
}

const SpeedAlerts: React.FC<SpeedAlertsProps> = ({ selectedVehicle }) => {
  // State for speed alerts
  const [speedAlerts, setSpeedAlerts] = useState([
    {
      id: "1",
      name: "School Zone",
      maxSpeed: 25,
      active: true,
      notifyExceeding: true,
      notifyDuration: 5, // seconds
      location: {
        address: "123 School St, San Francisco, CA",
        radius: 0.5, // miles
      },
      schedule: {
        enabled: true,
        days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        startTime: "07:00",
        endTime: "16:00",
      },
    },
    {
      id: "2",
      name: "Highway Alert",
      maxSpeed: 75,
      active: true,
      notifyExceeding: true,
      notifyDuration: 10, // seconds
      location: null,
      schedule: {
        enabled: false,
        days: [],
        startTime: "",
        endTime: "",
      },
    },
    {
      id: "3",
      name: "Residential Area",
      maxSpeed: 30,
      active: false,
      notifyExceeding: true,
      notifyDuration: 5, // seconds
      location: {
        address: "456 Neighborhood Ave, San Francisco, CA",
        radius: 1.0, // miles
      },
      schedule: {
        enabled: false,
        days: [],
        startTime: "",
        endTime: "",
      },
    },
  ])

  // State for editing alert
  const [editingAlert, setEditingAlert] = useState<any | null>(null)
  const [isAddingAlert, setIsAddingAlert] = useState(false)

  // New alert template
  const newAlertTemplate = {
    id: `new-${Date.now()}`,
    name: "",
    maxSpeed: 55,
    active: true,
    notifyExceeding: true,
    notifyDuration: 5, // seconds
    location: null,
    schedule: {
      enabled: false,
      days: [],
      startTime: "08:00",
      endTime: "17:00",
    },
  }

  // State for speed history
  const [speedHistory] = useState([
    {
      id: "1",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      maxSpeed: 78,
      avgSpeed: 62,
      duration: "45 minutes",
      location: "Highway 101",
      alerts: 2,
    },
    {
      id: "2",
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      maxSpeed: 65,
      avgSpeed: 45,
      duration: "30 minutes",
      location: "Downtown",
      alerts: 0,
    },
    {
      id: "3",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      maxSpeed: 82,
      avgSpeed: 70,
      duration: "1 hour 15 minutes",
      location: "Interstate 280",
      alerts: 3,
    },
  ])

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  // Toggle alert active state
  const toggleAlertActive = (alertId: string) => {
    setSpeedAlerts(
      speedAlerts.map((alert) => {
        if (alert.id === alertId) {
          return { ...alert, active: !alert.active }
        }
        return alert
      }),
    )
  }

  // Start editing an alert
  const startEditingAlert = (alert: any) => {
    setEditingAlert({ ...alert })
    setIsAddingAlert(false)
  }

  // Start adding a new alert
  const startAddingAlert = () => {
    setEditingAlert({ ...newAlertTemplate })
    setIsAddingAlert(true)
  }

  // Cancel editing
  const cancelEditing = () => {
    setEditingAlert(null)
    setIsAddingAlert(false)
  }

  // Save alert changes
  const saveAlertChanges = () => {
    if (!editingAlert) return

    if (isAddingAlert) {
      // Add new alert
      setSpeedAlerts([...speedAlerts, editingAlert])
    } else {
      // Update existing alert
      setSpeedAlerts(speedAlerts.map((alert) => (alert.id === editingAlert.id ? editingAlert : alert)))
    }

    setEditingAlert(null)
    setIsAddingAlert(false)
  }

  // Delete alert
  const deleteAlert = (alertId: string) => {
    if (confirm("Are you sure you want to delete this speed alert?")) {
      setSpeedAlerts(speedAlerts.filter((alert) => alert.id !== alertId))
    }
  }

  // Handle input change for editing alert
  const handleInputChange = (field: string, value: any) => {
    if (!editingAlert) return

    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setEditingAlert({
        ...editingAlert,
        [parent]: {
          ...editingAlert[parent],
          [child]: value,
        },
      })
    } else {
      setEditingAlert({
        ...editingAlert,
        [field]: value,
      })
    }
  }

  // Toggle day selection in schedule
  const toggleDay = (day: string) => {
    if (!editingAlert) return

    const days = [...editingAlert.schedule.days]
    if (days.includes(day)) {
      const index = days.indexOf(day)
      days.splice(index, 1)
    } else {
      days.push(day)
    }

    setEditingAlert({
      ...editingAlert,
      schedule: {
        ...editingAlert.schedule,
        days,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Speed Alerts</h1>
        <Button variant="primary" size="sm" leftIcon={<Plus size={16} />} onClick={startAddingAlert}>
          Add Speed Alert
        </Button>
      </div>

      {/* Current Speed */}
      <Card>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="w-24 h-24 rounded-full border-8 border-blue-500 flex items-center justify-center mr-6">
              <div className="text-center">
                <div className="text-3xl font-bold">45</div>
                <div className="text-sm text-gray-500">MPH</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Current Speed</h3>
              <p className="text-sm text-gray-500">
                {selectedVehicle.make} {selectedVehicle.model}
              </p>
              <div className="flex items-center mt-1">
                <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-500">Main Street, San Francisco</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500">Speed Limit</div>
              <div className="text-xl font-bold">45 MPH</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500">Max Today</div>
              <div className="text-xl font-bold">68 MPH</div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500">Avg Today</div>
              <div className="text-xl font-bold">42 MPH</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Speed Alerts List */}
      <Card title="Speed Alerts">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Set up speed alerts to be notified when your vehicle exceeds specified speed limits.
          </p>

          {speedAlerts.length > 0 ? (
            <div className="space-y-4">
              {speedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`border ${
                    alert.active ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"
                  } rounded-lg p-4`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full ${
                          alert.active ? "bg-blue-100" : "bg-gray-100"
                        } flex items-center justify-center mr-3`}
                      >
                        <Gauge className={`w-5 h-5 ${alert.active ? "text-blue-500" : "text-gray-500"}`} />
                      </div>
                      <div>
                        <div className="font-medium">{alert.name}</div>
                        <div className="text-sm text-gray-500">Max Speed: {alert.maxSpeed} MPH</div>
                      </div>
                    </div>

                    <div className="flex items-center mt-3 sm:mt-0">
                      <label className="relative inline-flex items-center cursor-pointer mr-4">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={alert.active}
                          onChange={() => toggleAlertActive(alert.id)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Edit size={16} />}
                        onClick={() => startEditingAlert(alert)}
                        className="mr-2"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        leftIcon={<Trash size={16} />}
                        onClick={() => deleteAlert(alert.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  {alert.location && (
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>
                        {alert.location.address} (within {alert.location.radius} miles)
                      </span>
                    </div>
                  )}

                  {alert.schedule.enabled && (
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>
                        Active: {alert.schedule.days.map((d) => d.substring(0, 3)).join(", ")} from{" "}
                        {alert.schedule.startTime} to {alert.schedule.endTime}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Gauge className="w-12 h-12 mx-auto text-gray-300 mb-2" />
              <h3 className="text-lg font-medium text-gray-800">No Speed Alerts</h3>
              <p className="text-gray-500 mt-1">Create your first speed alert to get started.</p>
              <Button
                variant="primary"
                size="sm"
                className="mt-4"
                leftIcon={<Plus size={16} />}
                onClick={startAddingAlert}
              >
                Add Speed Alert
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Edit Alert Form */}
      {editingAlert && (
        <Card title={isAddingAlert ? "Add New Speed Alert" : "Edit Speed Alert"}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Alert Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={editingAlert.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="School Zone, Highway, etc."
                />
              </div>

              <div>
                <label htmlFor="maxSpeed" className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Speed (MPH)
                </label>
                <input
                  type="number"
                  id="maxSpeed"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={editingAlert.maxSpeed}
                  onChange={(e) => handleInputChange("maxSpeed", Number.parseInt(e.target.value))}
                  min="5"
                  max="150"
                />
              </div>

              <div>
                <label htmlFor="notifyDuration" className="block text-sm font-medium text-gray-700 mb-1">
                  Notification Duration (seconds)
                </label>
                <input
                  type="number"
                  id="notifyDuration"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={editingAlert.notifyDuration}
                  onChange={(e) => handleInputChange("notifyDuration", Number.parseInt(e.target.value))}
                  min="1"
                  max="60"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="active"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={editingAlert.active}
                  onChange={(e) => handleInputChange("active", e.target.checked)}
                />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                  Alert is active
                </label>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium mb-4">Location Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="locationEnabled"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={!!editingAlert.location}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleInputChange("location", { address: "", radius: 0.5 })
                      } else {
                        handleInputChange("location", null)
                      }
                    }}
                  />
                  <label htmlFor="locationEnabled" className="ml-2 block text-sm text-gray-700">
                    Enable location-based alert
                  </label>
                </div>

                {editingAlert.location && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address or Location
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={editingAlert.location.address}
                        onChange={(e) => handleInputChange("location.address", e.target.value)}
                        placeholder="123 Main St, City, State"
                      />
                    </div>

                    <div>
                      <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1">
                        Radius (miles)
                      </label>
                      <input
                        type="number"
                        id="radius"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={editingAlert.location.radius}
                        onChange={(e) => handleInputChange("location.radius", Number.parseFloat(e.target.value))}
                        min="0.1"
                        max="10"
                        step="0.1"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium mb-4">Schedule Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="scheduleEnabled"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={editingAlert.schedule.enabled}
                    onChange={(e) => handleInputChange("schedule.enabled", e.target.checked)}
                  />
                  <label htmlFor="scheduleEnabled" className="ml-2 block text-sm text-gray-700">
                    Enable schedule-based alert
                  </label>
                </div>

                {editingAlert.schedule.enabled && (
                  <div className="pl-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Active Days</label>
                      <div className="flex flex-wrap gap-2">
                        {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                          <button
                            key={day}
                            type="button"
                            className={`px-3 py-1 text-sm rounded-full ${
                              editingAlert.schedule.days.includes(day)
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() => toggleDay(day)}
                          >
                            {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          id="startTime"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          value={editingAlert.schedule.startTime}
                          onChange={(e) => handleInputChange("schedule.startTime", e.target.value)}
                        />
                      </div>

                      <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          id="endTime"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          value={editingAlert.schedule.endTime}
                          onChange={(e) => handleInputChange("schedule.endTime", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={cancelEditing}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={saveAlertChanges}>
                {isAddingAlert ? "Add Alert" : "Save Changes"}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Speed History */}
      <Card title="Speed History">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Review your vehicle's speed history and any speed alerts that were triggered.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Max Speed
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Avg Speed
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Duration
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Alerts
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {speedHistory.map((history) => (
                  <tr key={history.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(history.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{history.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{history.maxSpeed} MPH</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{history.avgSpeed} MPH</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{history.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {history.alerts > 0 ? (
                        <Badge variant="danger" size="sm">
                          {history.alerts} alerts
                        </Badge>
                      ) : (
                        <Badge variant="success" size="sm">
                          None
                        </Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Speed Alert Tips */}
      <Card title="Speed Alert Tips">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <AlertCircle className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">School Zones</h4>
              <p className="text-sm text-gray-600">
                Set up location-based alerts for school zones with a 25 MPH limit during school hours.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <AlertCircle className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Teen Drivers</h4>
              <p className="text-sm text-gray-600">
                For teen drivers, consider setting up a general speed alert of 65 MPH to encourage safe driving habits.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <AlertCircle className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Construction Zones</h4>
              <p className="text-sm text-gray-600">
                Temporary construction zones often have reduced speed limits. Create time-limited alerts for these
                areas.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SpeedAlerts
