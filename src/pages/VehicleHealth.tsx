import type React from "react"
import type { Vehicle } from "../types/vehicle"
import Card from "../components/ui/Card"
import { Battery, Droplet, Gauge, PenToolIcon as Tool, AlertCircle, CheckCircle } from "lucide-react"
import { mockDiagnosticCodes } from "../data/mockData"
import Badge from "../components/ui/Badge"

interface VehicleHealthProps {
  selectedVehicle: Vehicle
}

const VehicleHealth: React.FC<VehicleHealthProps> = ({ selectedVehicle }) => {
  // Filter diagnostic codes for the selected vehicle
  const vehicleDiagnosticCodes = mockDiagnosticCodes.filter((code) => code.vehicleId === selectedVehicle.id)

  // Calculate overall health score (mock calculation)
  const calculateHealthScore = () => {
    let score = 100

    // Deduct points for active diagnostic codes
    score -= vehicleDiagnosticCodes.length * 5

    // Deduct points for engine status
    if (selectedVehicle.engineStatus === "warning") score -= 10
    if (selectedVehicle.engineStatus === "critical") score -= 30

    // Deduct points for tire pressure issues
    const recommendedPressure = 32
    const pressureThreshold = 5
    Object.values(selectedVehicle.tirePressure).forEach((pressure) => {
      if (Math.abs(pressure - recommendedPressure) > pressureThreshold) {
        score -= 5
      }
    })

    // Deduct points for battery health issues (if applicable)
    if (selectedVehicle.batteryHealth && selectedVehicle.batteryHealth < 80) {
      score -= (80 - selectedVehicle.batteryHealth) / 2
    }

    // Ensure score is between 0 and 100
    return Math.max(0, Math.min(100, Math.round(score)))
  }

  const healthScore = calculateHealthScore()

  // Determine health status color
  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "critical":
        return "danger"
      case "warning":
        return "warning"
      case "normal":
        return "success"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Vehicle Health</h1>
        <Badge variant={healthScore >= 80 ? "success" : healthScore >= 60 ? "warning" : "danger"} size="lg">
          Health Score: {healthScore}%
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vehicle Overview */}
        <Card title="Vehicle Overview">
          <div className="flex items-center mb-4">
            <img
              src={selectedVehicle.image || "/placeholder.svg?height=200&width=300"}
              alt={`${selectedVehicle.make} ${selectedVehicle.model}`}
              className="w-32 h-24 object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="text-lg font-medium">
                {selectedVehicle.make} {selectedVehicle.model}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedVehicle.year} • {selectedVehicle.licensePlate}
              </p>
              <p className="text-sm text-gray-500">Mileage: {selectedVehicle.mileage.toLocaleString()} miles</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  selectedVehicle.engineStatus === "normal"
                    ? "bg-green-500"
                    : selectedVehicle.engineStatus === "warning"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              ></div>
              <div>
                <div className="text-xs text-gray-500">Engine Status</div>
                <div className="text-sm font-medium capitalize">{selectedVehicle.engineStatus}</div>
              </div>
            </div>

            <div className="flex items-center">
              <Tool className="w-4 h-4 text-gray-500 mr-2" />
              <div>
                <div className="text-xs text-gray-500">Last Service</div>
                <div className="text-sm font-medium">{new Date(selectedVehicle.lastService).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="flex items-center">
              <Tool className="w-4 h-4 text-gray-500 mr-2" />
              <div>
                <div className="text-xs text-gray-500">Next Service</div>
                <div className="text-sm font-medium">
                  {new Date(selectedVehicle.nextServiceDue).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <Gauge className="w-4 h-4 text-gray-500 mr-2" />
              <div>
                <div className="text-xs text-gray-500">Service Due</div>
                <div className="text-sm font-medium">{selectedVehicle.nextServiceMileage.toLocaleString()} miles</div>
              </div>
            </div>
          </div>
        </Card>

        {/* System Status */}
        <Card title="System Status">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Tool className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium">Engine</span>
              </div>
              <Badge variant={getStatusBadgeVariant(selectedVehicle.engineStatus)} size="sm">
                {selectedVehicle.engineStatus}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Gauge className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium">Tire Pressure</span>
              </div>
              <Badge
                variant={
                  Object.values(selectedVehicle.tirePressure).some((p) => p < 30 || p > 36) ? "warning" : "success"
                }
                size="sm"
              >
                {Object.values(selectedVehicle.tirePressure).some((p) => p < 30 || p > 36)
                  ? "Check Required"
                  : "Normal"}
              </Badge>
            </div>

            {(selectedVehicle.fuelType === "electric" || selectedVehicle.fuelType === "hybrid") && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Battery className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-sm font-medium">Battery</span>
                </div>
                <Badge
                  variant={
                    (selectedVehicle.batteryHealth || 0) > 80
                      ? "success"
                      : (selectedVehicle.batteryHealth || 0) > 60
                        ? "warning"
                        : "danger"
                  }
                  size="sm"
                >
                  {(selectedVehicle.batteryHealth || 0) > 80
                    ? "Good"
                    : (selectedVehicle.batteryHealth || 0) > 60
                      ? "Fair"
                      : "Poor"}
                </Badge>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Droplet className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium">Fuel System</span>
              </div>
              <Badge variant="success" size="sm">
                Normal
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-gray-500 mr-2" />
                <span className="text-sm font-medium">Diagnostic Codes</span>
              </div>
              <Badge variant={vehicleDiagnosticCodes.length > 0 ? "danger" : "success"} size="sm">
                {vehicleDiagnosticCodes.length > 0 ? `${vehicleDiagnosticCodes.length} Active` : "None"}
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Diagnostic Codes */}
      <Card title="Diagnostic Codes">
        {vehicleDiagnosticCodes.length > 0 ? (
          <div className="space-y-4">
            {vehicleDiagnosticCodes.map((code) => (
              <div key={code.id} className="p-4 border rounded-md bg-red-50 border-red-200">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">
                        Code {code.code}: {code.description}
                      </h4>
                      <Badge
                        variant={
                          code.severity === "high" ? "danger" : code.severity === "medium" ? "warning" : "primary"
                        }
                        size="sm"
                      >
                        {code.severity} severity
                      </Badge>
                    </div>

                    <div className="mt-2">
                      <h5 className="text-xs font-medium text-gray-500">Possible Causes:</h5>
                      <ul className="mt-1 text-xs text-gray-600 list-disc list-inside">
                        {code.possibleCauses.map((cause, index) => (
                          <li key={index}>{cause}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-2">
                      <h5 className="text-xs font-medium text-gray-500">Recommended Action:</h5>
                      <p className="mt-1 text-xs text-gray-600">{code.recommendedAction}</p>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                      <span>Detected: {new Date(code.timestamp).toLocaleDateString()}</span>
                      <span className="capitalize">Status: {code.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-2" />
            <h3 className="text-lg font-medium text-gray-800">No Diagnostic Codes</h3>
            <p className="text-gray-500 mt-1">Your vehicle is running smoothly with no active diagnostic codes.</p>
          </div>
        )}
      </Card>
    </div>
  )
}

export default VehicleHealth
