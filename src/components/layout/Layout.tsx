"use client"

import type React from "react"

import { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import type { Vehicle } from "../../types/vehicle"
import { mockVehicles } from "../../data/mockData"
import {
  Home,
  AlertCircle,
  Battery,
  Calendar,
  BarChart2,
  Map,
  Settings,
  Menu,
  X,
  Bell,
  Car,
  Gauge,
  Droplet,
  FileText,
  PenToolIcon as Tool,
  Cloud,
  Shield,
  Users,
  Share2,
  Activity,
  ChevronDown,
} from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
  selectedVehicle: Vehicle
  setSelectedVehicle: (vehicle: Vehicle) => void
}

const Layout: React.FC<LayoutProps> = ({ children, selectedVehicle, setSelectedVehicle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const navigationItems = [
    { path: "/dashboard", name: "Dashboard", icon: <Home size={20} /> },
    { path: "/vehicle-health", name: "Vehicle Health", icon: <Car size={20} /> },
    { path: "/alerts", name: "Alerts", icon: <AlertCircle size={20} /> },
    { path: "/maintenance", name: "Maintenance", icon: <Tool size={20} /> },
    { path: "/battery", name: "Battery", icon: <Battery size={20} /> },
    { path: "/tire-pressure", name: "Tire Pressure", icon: <Gauge size={20} /> },
    { path: "/trips", name: "Trips", icon: <Map size={20} /> },
    { path: "/notifications", name: "Notifications", icon: <Bell size={20} /> },
    { path: "/fuel-analysis", name: "Fuel Analysis", icon: <Droplet size={20} /> },
    { path: "/emergency", name: "Emergency", icon: <AlertCircle size={20} className="text-red-500" /> },
    { path: "/parking", name: "Parking", icon: <Map size={20} /> },
    { path: "/speed-alerts", name: "Speed Alerts", icon: <Gauge size={20} /> },
    { path: "/diagnostics", name: "Diagnostics", icon: <Tool size={20} /> },
    { path: "/reports", name: "Reports", icon: <FileText size={20} /> },
    { path: "/mechanic-finder", name: "Mechanic Finder", icon: <Tool size={20} /> },
    { path: "/predictive-maintenance", name: "Predictive Maintenance", icon: <Calendar size={20} /> },
    { path: "/weather-impact", name: "Weather Impact", icon: <Cloud size={20} /> },
    { path: "/insurance", name: "Insurance", icon: <Shield size={20} /> },
    { path: "/fleet", name: "Fleet Management", icon: <Users size={20} /> },
    { path: "/carpool", name: "Carpooling", icon: <Share2 size={20} /> },
    { path: "/behavior", name: "Driver Behavior", icon: <Activity size={20} /> },
  ]

  const settingsItems = [
    { path: "/settings/notifications", name: "Notification Settings", icon: <Bell size={20} /> },
    { path: "/settings/dashboard", name: "Dashboard Settings", icon: <BarChart2 size={20} /> },
    { path: "/settings  name: 'Dashboard Settings", icon: <BarChart2 size={20} /> },
    { path: "/settings/vehicles", name: "Vehicle Settings", icon: <Car size={20} /> },
    { path: "/settings/profile", name: "Profile Settings", icon: <Settings size={20} /> },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <div className={`hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-gray-800 text-white`}>
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <h1 className="text-xl font-bold">MechSense</h1>
        </div>

        {/* Vehicle Selector */}
        <div className="px-4 py-2 border-b border-gray-700">
          <div className="relative">
            <select
              className="w-full bg-gray-700 text-white py-2 px-3 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedVehicle.id}
              onChange={(e) => {
                const vehicle = mockVehicles.find((v) => v.id === e.target.value)
                if (vehicle) setSelectedVehicle(vehicle)
              }}
            >
              {mockVehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name} ({vehicle.make} {vehicle.model})
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 text-sm rounded-md ${
                  isActive(item.path) ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-8">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Settings</h3>
            <nav className="mt-2 px-2 space-y-1">
              {settingsItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm rounded-md ${
                    isActive(item.path) ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={closeSidebar}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-full max-w-xs bg-gray-800 text-white">
          <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
            <h1 className="text-xl font-bold">MechSense</h1>
            <button
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
              onClick={closeSidebar}
            >
              <X size={24} />
            </button>
          </div>

          {/* Vehicle Selector */}
          <div className="px-4 py-2 border-b border-gray-700">
            <div className="relative">
              <select
                className="w-full bg-gray-700 text-white py-2 px-3 rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedVehicle.id}
                onChange={(e) => {
                  const vehicle = mockVehicles.find((v) => v.id === e.target.value)
                  if (vehicle) setSelectedVehicle(vehicle)
                }}
              >
                {mockVehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.name} ({vehicle.make} {vehicle.model})
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 text-sm rounded-md ${
                    isActive(item.path) ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={closeSidebar}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-8">
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Settings</h3>
              <nav className="mt-2 px-2 space-y-1">
                {settingsItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-2 text-sm rounded-md ${
                      isActive(item.path) ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700"
                    }`}
                    onClick={closeSidebar}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:ml-64 flex flex-col flex-1">
        {/* Top navigation */}
        <div className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center md:hidden">
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  onClick={toggleSidebar}
                >
                  <Menu size={24} />
                </button>
              </div>
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-800 md:hidden">MechSense</h1>
              </div>
              <div className="flex items-center">
                <button className="p-1 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Bell size={20} />
                </button>
                <div className="ml-3 relative">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-sm font-medium">JD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

export default Layout
