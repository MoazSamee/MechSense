"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Layout from "./components/layout/Layout"
import Dashboard from "./pages/Dashboard"
import VehicleHealth from "./pages/VehicleHealth"
import Alerts from "./pages/Alerts"
import Maintenance from "./pages/Maintenance"
import Battery from "./pages/Battery"
import TirePressure from "./pages/TirePressure"
import Trips from "./pages/Trips"
import Notifications from "./pages/Notifications"
import FuelAnalysis from "./pages/FuelAnalysis"
import Emergency from "./pages/Emergency"
import Parking from "./pages/parking"
import SpeedAlerts from "./pages/SpeedAlerts"
import Diagnostics from "./pages/Diagnostics"
import Reports from "./pages/reports"
import MechanicFinder from "./pages/MechanicFinder"
import PredictiveMaintenance from "./pages/PredictiveMaintenance"
import WeatherImpact from "./pages/wheaterimpact"
import Insurance from "./pages/insurance"
//import Fleet from "./pages/Fleet"
//import Carpool from "./pages/Carpool"
//import Behavior from "./pages/Behavior"
import NotificationSettings from "./pages/settings/NotificationSettings"
import DashboardSettings from "./pages/settings/DashboardSettings"
import VehicleSettings from "./pages/settings/VehicleSettings"
import ProfileSettings from "./pages/settings/ProfileSettings"
import type { Vehicle } from "./types/vehicle"
import { mockVehicles } from "./data/mockData"

function App() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(mockVehicles[0])

  return (
    <Router>
      <Layout selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle}>
        <Routes>
          <Route path="/" element={<Dashboard selectedVehicle={selectedVehicle} />} />
          <Route path="/dashboard" element={<Dashboard selectedVehicle={selectedVehicle} />} />
          <Route path="/vehicle-health" element={<VehicleHealth selectedVehicle={selectedVehicle} />} />
          <Route path="/alerts" element={<Alerts selectedVehicle={selectedVehicle} />} />
          <Route path="/maintenance" element={<Maintenance selectedVehicle={selectedVehicle} />} />
          <Route path="/battery" element={<Battery selectedVehicle={selectedVehicle} />} />
          <Route path="/tire-pressure" element={<TirePressure selectedVehicle={selectedVehicle} />} />
          <Route path="/trips" element={<Trips selectedVehicle={selectedVehicle} />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/fuel-analysis" element={<FuelAnalysis selectedVehicle={selectedVehicle} />} />
          <Route path="/emergency" element={<Emergency selectedVehicle={selectedVehicle} />} />
          
          <Route path="/diagnostics" element={<Diagnostics selectedVehicle={selectedVehicle} />} />
          
          <Route path="/mechanic-finder" element={<MechanicFinder selectedVehicle={selectedVehicle} />} />
          <Route path="/predictive-maintenance" element={<PredictiveMaintenance selectedVehicle={selectedVehicle} />} />
          <Route path="/speed-alerts" element={<SpeedAlerts selectedVehicle={selectedVehicle} />} />
          <Route path="/reports" element={<Reports selectedVehicle={selectedVehicle} />} />

          <Route path="/weather-impact" element={<WeatherImpact selectedVehicle={selectedVehicle} />} />
          <Route path="/insurance" element={<Insurance selectedVehicle={selectedVehicle} />} />
          
          <Route path="/settings/notifications" element={<NotificationSettings />} />
          <Route path="/settings/dashboard" element={<DashboardSettings />} />
          <Route path="/settings/vehicles" element={<VehicleSettings />} />
          <Route path="/settings/profile" element={<ProfileSettings />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App



/*

          <Route path="/fleet" element={<Fleet />} />
          <Route path="/carpool" element={<Carpool selectedVehicle={selectedVehicle} />} />
          <Route path="/behavior" element={<Behavior selectedVehicle={selectedVehicle} />} />

          */