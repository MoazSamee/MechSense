import type React from "react"
import Card from "../ui/Card"
import { Battery } from "lucide-react"

interface BatteryWidgetProps {
  batteryLevel: number
  batteryHealth?: number
  chargingStatus?: "charging" | "discharging" | "idle"
  estimatedRange?: number
}

const BatteryWidget: React.FC<BatteryWidgetProps> = ({
  batteryLevel,
  batteryHealth = 100,
  chargingStatus = "idle",
  estimatedRange,
}) => {
  // Determine color based on battery level
  const getBatteryLevelColor = () => {
    if (batteryLevel > 50) return "bg-green-500"
    if (batteryLevel > 20) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Determine color based on battery health
  const getBatteryHealthColor = () => {
    if (batteryHealth > 80) return "text-green-500"
    if (batteryHealth > 60) return "text-yellow-500"
    return "text-red-500"
  }

  // Get charging status icon
  const getChargingStatusIcon = () => {
    switch (chargingStatus) {
      case "charging":
        return "⚡"
      case "discharging":
        return "↓"
      default:
        return ""
    }
  }

  return (
    <Card className="h-full">
      <div className="flex flex-col items-center">
        <div className="text-gray-500 mb-2 flex items-center">
          <Battery className="w-5 h-5 mr-1" />
          <span>Battery Status</span>
        </div>

        {/* Battery level indicator */}
        <div className="relative w-full">
          <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getBatteryLevelColor()} transition-all duration-500 ease-out`}
              style={{ width: `${batteryLevel}%` }}
            ></div>
          </div>
          {chargingStatus === "charging" && <div className="absolute top-0 right-2 text-lg">⚡</div>}
        </div>

        <div className="mt-2 text-2xl font-bold flex items-center">
          {batteryLevel}% {getChargingStatusIcon()}
        </div>

        {estimatedRange && <div className="mt-1 text-sm text-gray-500">Est. Range: {estimatedRange} miles</div>}

        <div className="mt-3 flex items-center">
          <span className="text-sm text-gray-500 mr-2">Battery Health:</span>
          <span className={`text-sm font-medium ${getBatteryHealthColor()}`}>{batteryHealth}%</span>
        </div>
      </div>
    </Card>
  )
}

export default BatteryWidget
