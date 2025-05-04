"use client"

import type React from "react"
import { useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { Bell, Mail, MessageSquare, Save, Smartphone } from "lucide-react"
import { mockUserProfile } from "../../data/mockData"

const NotificationSettings: React.FC = () => {
  // State for notification preferences
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: mockUserProfile.notificationPreferences.email,
    push: mockUserProfile.notificationPreferences.push,
    sms: mockUserProfile.notificationPreferences.sms,
  })

  // State for notification types
  const [notificationTypes, setNotificationTypes] = useState({
    critical: {
      email: true,
      push: true,
      sms: true,
    },
    warning: {
      email: true,
      push: true,
      sms: false,
    },
    maintenance: {
      email: true,
      push: true,
      sms: false,
    },
    trips: {
      email: false,
      push: true,
      sms: false,
    },
    system: {
      email: true,
      push: false,
      sms: false,
    },
  })

  // State for quiet hours
  const [quietHours, setQuietHours] = useState({
    enabled: false,
    startTime: "22:00",
    endTime: "07:00",
    allowCritical: true,
  })

  // Handle notification preference change
  const handlePrefChange = (type: keyof typeof notificationPrefs) => {
    setNotificationPrefs({
      ...notificationPrefs,
      [type]: !notificationPrefs[type],
    })
  }

  // Handle notification type change
  const handleTypeChange = (
    alertType: keyof typeof notificationTypes,
    channel: keyof (typeof notificationTypes)["critical"],
  ) => {
    setNotificationTypes({
      ...notificationTypes,
      [alertType]: {
        ...notificationTypes[alertType],
        [channel]: !notificationTypes[alertType][channel],
      },
    })
  }

  // Handle quiet hours change
  const handleQuietHoursChange = (field: keyof typeof quietHours, value: any) => {
    setQuietHours({
      ...quietHours,
      [field]: value,
    })
  }

  // Save settings
  const saveSettings = () => {
    // In a real app, this would save to the backend
    alert("Notification settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Notification Settings</h1>
        <Button variant="primary" size="sm" leftIcon={<Save size={16} />} onClick={saveSettings}>
          Save Changes
        </Button>
      </div>

      {/* Notification Channels */}
      <Card title="Notification Channels">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">Choose how you want to receive notifications from MechSense.</p>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-gray-500">Receive notifications via email</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notificationPrefs.email}
                onChange={() => handlePrefChange("email")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Bell className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="font-medium">Push Notifications</div>
                <div className="text-sm text-gray-500">Receive notifications on your device</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notificationPrefs.push}
                onChange={() => handlePrefChange("push")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="font-medium">SMS Notifications</div>
                <div className="text-sm text-gray-500">Receive notifications via text message</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notificationPrefs.sms}
                onChange={() => handlePrefChange("sms")}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <Smartphone className="w-4 h-4 inline-block mr-1" />
            <span>
              Phone number for SMS: {mockUserProfile.phone || "Not set"}{" "}
              {!mockUserProfile.phone && (
                <Button variant="outline" size="sm">
                  Add Phone
                </Button>
              )}
            </span>
          </div>
        </div>
      </Card>

      {/* Notification Types */}
      <Card title="Notification Types">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Customize which types of notifications you receive and through which channels.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Notification Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Push
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    SMS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Critical Alerts</div>
                    <div className="text-xs text-gray-500">Engine problems, safety issues</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationTypes.critical.email}
                        onChange={() => handleTypeChange("critical", "email")}
                        disabled={!notificationPrefs.email}
                      />
                      <div
                        className={`w-11 h-6 ${
                          !notificationPrefs.email ? "bg-gray-100" : "bg-gray-200"
                        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationTypes.critical.push}
                        onChange={() => handleTypeChange("critical", "push")}
                        disabled={!notificationPrefs.push}
                      />
                      <div
                        className={`w-11 h-6 ${
                          !notificationPrefs.push ? "bg-gray-100" : "bg-gray-200"
                        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationTypes.critical.sms}
                        onChange={() => handleTypeChange("critical", "sms")}
                        disabled={!notificationPrefs.sms}
                      />
                      <div
                        className={`w-11 h-6 ${
                          !notificationPrefs.sms ? "bg-gray-100" : "bg-gray-200"
                        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Warning Alerts</div>
                    <div className="text-xs text-gray-500">Low tire pressure, low fuel</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationTypes.warning.email}
                        onChange={() => handleTypeChange("warning", "email")}
                        disabled={!notificationPrefs.email}
                      />
                      <div
                        className={`w-11 h-6 ${
                          !notificationPrefs.email ? "bg-gray-100" : "bg-gray-200"
                        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationTypes.warning.push}
                        onChange={() => handleTypeChange("warning", "push")}
                        disabled={!notificationPrefs.push}
                      />
                      <div
                        className={`w-11 h-6 ${
                          !notificationPrefs.push ? "bg-gray-100" : "bg-gray-200"
                        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationTypes.warning.sms}
                        onChange={() => handleTypeChange("warning", "sms")}
                        disabled={!notificationPrefs.sms}
                      />
                      <div
                        className={`w-11 h-6 ${
                          !notificationPrefs.sms ? "bg-gray-100" : "bg-gray-200"
                        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Maintenance Reminders</div>
                    <div className="text-xs text-gray-500">Service due, oil change</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationTypes.maintenance.email}
                        onChange={() => handleTypeChange("maintenance", "email")}
                        disabled={!notificationPrefs.email}
                      />
                      <div
                        className={`w-11 h-6 ${
                          !notificationPrefs.email ? "bg-gray-100" : "bg-gray-200"
                        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationTypes.maintenance.push}
                        onChange={() => handleTypeChange("maintenance", "push")}
                        disabled={!notificationPrefs.push}
                      />
                      <div
                        className={`w-11 h-6 ${
                          !notificationPrefs.push ? "bg-gray-100" : "bg-gray-200"
                        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationTypes.maintenance.sms}
                        onChange={() => handleTypeChange("maintenance", "sms")}
                        disabled={!notificationPrefs.sms}
                      />
                      <div
                        className={`w-11 h-6 ${
                          !notificationPrefs.sms ? "bg-gray-100" : "bg-gray-200"
                        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Trip Summaries</div>
                    <div className="text-xs text-gray-500">Trip completed, fuel efficiency</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationTypes.trips.email}
                        onChange={() => handleTypeChange("trips", "email")}
                        disabled={!notificationPrefs.email}
                      />
                      <div
                        className={`w-11 h-6 ${
                          !notificationPrefs.email ? "bg-gray-100" : "bg-gray-200"
                        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationTypes.trips.push}
                        onChange={() => handleTypeChange("trips", "push")}
                        disabled={!notificationPrefs.push}
                      />
                      <div
                        className={`w-11 h-6 ${
                          !notificationPrefs.push ? "bg-gray-100" : "bg-gray-200"
                        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationTypes.trips.sms}
                        onChange={() => handleTypeChange("trips", "sms")}
                        disabled={!notificationPrefs.sms}
                      />
                      <div
                        className={`w-11 h-6 ${
                          !notificationPrefs.sms ? "bg-gray-100" : "bg-gray-200"
                        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">System Updates</div>
                    <div className="text-xs text-gray-500">App updates, new features</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationTypes.system.email}
                        onChange={() => handleTypeChange("system", "email")}
                        disabled={!notificationPrefs.email}
                      />
                      <div
                        className={`w-11 h-6 ${
                          !notificationPrefs.email ? "bg-gray-100" : "bg-gray-200"
                        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationTypes.system.push}
                        onChange={() => handleTypeChange("system", "push")}
                        disabled={!notificationPrefs.push}
                      />
                      <div
                        className={`w-11 h-6 ${
                          !notificationPrefs.push ? "bg-gray-100" : "bg-gray-200"
                        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationTypes.system.sms}
                        onChange={() => handleTypeChange("system", "sms")}
                        disabled={!notificationPrefs.sms}
                      />
                      <div
                        className={`w-11 h-6 ${
                          !notificationPrefs.sms ? "bg-gray-100" : "bg-gray-200"
                        } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                      ></div>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Quiet Hours */}
      <Card title="Quiet Hours">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Set up quiet hours during which you won't receive non-critical notifications.
          </p>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Bell className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="font-medium">Enable Quiet Hours</div>
                <div className="text-sm text-gray-500">Pause non-critical notifications during specified hours</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={quietHours.enabled}
                onChange={() => handleQuietHoursChange("enabled", !quietHours.enabled)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {quietHours.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={quietHours.startTime}
                  onChange={(e) => handleQuietHoursChange("startTime", e.target.value)}
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
                  value={quietHours.endTime}
                  onChange={(e) => handleQuietHoursChange("endTime", e.target.value)}
                />
              </div>
            </div>
          )}

          {quietHours.enabled && (
            <div className="mt-4">
              <div className="flex items-center">
                <input
                  id="allowCritical"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={quietHours.allowCritical}
                  onChange={() => handleQuietHoursChange("allowCritical", !quietHours.allowCritical)}
                />
                <label htmlFor="allowCritical" className="ml-2 block text-sm text-gray-700">
                  Allow critical notifications during quiet hours
                </label>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Critical notifications include emergency alerts and important vehicle issues that require immediate
                attention.
              </p>
            </div>
          )}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" size="md" leftIcon={<Save size={16} />} onClick={saveSettings}>
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default NotificationSettings
