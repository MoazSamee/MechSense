"use client"

import type React from "react"
import { useState } from "react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { ArrowDown, ArrowUp, LayoutGrid, Save, X } from "lucide-react"
import { mockDashboardWidgets } from "../../data/mockData"
import type { DashboardWidget } from "../../types/vehicle"

const DashboardSettings: React.FC = () => {
  // State for dashboard widgets
  const [widgets, setWidgets] = useState<DashboardWidget[]>([...mockDashboardWidgets])

  // Save settings
  const saveSettings = () => {
    // In a real app, this would save to the backend
    alert("Dashboard settings saved successfully!")
  }

  // Toggle widget visibility
  const toggleWidgetVisibility = (widgetId: string) => {
    setWidgets(
      widgets.map((widget) => {
        if (widget.id === widgetId) {
          return { ...widget, isVisible: !widget.isVisible }
        }
        return widget
      }),
    )
  }

  // Change widget size
  const changeWidgetSize = (widgetId: string, size: "small" | "medium" | "large") => {
    setWidgets(
      widgets.map((widget) => {
        if (widget.id === widgetId) {
          return { ...widget, size }
        }
        return widget
      }),
    )
  }

  // Move widget up in order
  const moveWidgetUp = (widgetId: string) => {
    const widgetIndex = widgets.findIndex((w) => w.id === widgetId)
    if (widgetIndex <= 0) return // Already at the top

    const newWidgets = [...widgets]
    const temp = newWidgets[widgetIndex]
    newWidgets[widgetIndex] = newWidgets[widgetIndex - 1]
    newWidgets[widgetIndex - 1] = temp

    // Update positions
    newWidgets.forEach((widget, index) => {
      widget.position = index + 1
    })

    setWidgets(newWidgets)
  }

  // Move widget down in order
  const moveWidgetDown = (widgetId: string) => {
    const widgetIndex = widgets.findIndex((w) => w.id === widgetId)
    if (widgetIndex >= widgets.length - 1) return // Already at the bottom

    const newWidgets = [...widgets]
    const temp = newWidgets[widgetIndex]
    newWidgets[widgetIndex] = newWidgets[widgetIndex + 1]
    newWidgets[widgetIndex + 1] = temp

    // Update positions
    newWidgets.forEach((widget, index) => {
      widget.position = index + 1
    })

    setWidgets(newWidgets)
  }

  // Get widget type display name
  const getWidgetTypeName = (type: string) => {
    switch (type) {
      case "speed":
        return "Current Speed"
      case "fuel":
        return "Fuel Level"
      case "battery":
        return "Battery Status"
      case "tirePressure":
        return "Tire Pressure"
      case "alerts":
        return "Recent Alerts"
      case "maintenance":
        return "Maintenance Schedule"
      case "weather":
        return "Weather Conditions"
      case "trips":
        return "Recent Trips"
      case "diagnostics":
        return "Diagnostic Status"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Settings</h1>
        <Button variant="primary" size="sm" leftIcon={<Save size={16} />} onClick={saveSettings}>
          Save Changes
        </Button>
      </div>

      {/* Dashboard Layout */}
      <Card title="Dashboard Layout">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Customize your dashboard by showing, hiding, resizing, and reordering widgets.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Widget
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Visible
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Size
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Order
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {widgets
                  .sort((a, b) => a.position - b.position)
                  .map((widget) => (
                    <tr key={widget.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <LayoutGrid className="w-5 h-5 text-gray-500 mr-2" />
                          <div className="text-sm font-medium text-gray-900">{getWidgetTypeName(widget.type)}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={widget.isVisible}
                            onChange={() => toggleWidgetVisibility(widget.id)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={widget.size}
                          onChange={(e) => changeWidgetSize(widget.id, e.target.value as "small" | "medium" | "large")}
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-1 rounded-md hover:bg-gray-100"
                            onClick={() => moveWidgetUp(widget.id)}
                            disabled={widget.position === 1}
                          >
                            <ArrowUp
                              className={`w-5 h-5 ${widget.position === 1 ? "text-gray-300" : "text-gray-500"}`}
                            />
                          </button>
                          <button
                            className="p-1 rounded-md hover:bg-gray-100"
                            onClick={() => moveWidgetDown(widget.id)}
                            disabled={widget.position === widgets.length}
                          >
                            <ArrowDown
                              className={`w-5 h-5 ${
                                widget.position === widgets.length ? "text-gray-300" : "text-gray-500"
                              }`}
                            />
                          </button>
                          <span className="text-sm text-gray-500">{widget.position}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Dashboard Preview */}
      <Card title="Dashboard Preview">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            This is a simplified preview of how your dashboard will look with the current settings.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="grid grid-cols-4 gap-4">
              {widgets
                .filter((widget) => widget.isVisible)
                .sort((a, b) => a.position - b.position)
                .map((widget) => (
                  <div
                    key={widget.id}
                    className={`bg-white rounded-lg shadow p-4 flex items-center justify-center ${
                      widget.size === "small" ? "col-span-1" : widget.size === "medium" ? "col-span-2" : "col-span-4"
                    }`}
                  >
                    <div className="text-center">
                      <LayoutGrid className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <div className="text-sm font-medium">{getWidgetTypeName(widget.type)}</div>
                      <div className="text-xs text-gray-500">{widget.size} widget</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Theme Settings */}
      <Card title="Theme Settings">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">Customize the appearance of your dashboard.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                Color Theme
              </label>
              <select
                id="theme"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>

            <div>
              <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700 mb-1">
                Accent Color
              </label>
              <select
                id="accentColor"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="red">Red</option>
                <option value="orange">Orange</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700 mb-1">
              Font Size
            </label>
            <select
              id="fontSize"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Reset Dashboard */}
      <Card title="Reset Dashboard">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Reset your dashboard to the default layout and settings. This action cannot be undone.
          </p>

          <Button variant="danger" size="sm" leftIcon={<X size={16} />}>
            Reset to Default
          </Button>
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

export default DashboardSettings
