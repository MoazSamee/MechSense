import type React from "react"
import Card from "../ui/Card"
import { Gauge } from "lucide-react"

interface SpeedWidgetProps {
  currentSpeed: number
  maxSpeed: number
  unit?: "mph" | "km/h"
}

const SpeedWidget: React.FC<SpeedWidgetProps> = ({ currentSpeed, maxSpeed, unit = "mph" }) => {
  // Calculate percentage for gauge
  const percentage = Math.min((currentSpeed / maxSpeed) * 100, 100)

  // Determine color based on speed
  const getSpeedColor = () => {
    if (percentage < 60) return "text-green-500"
    if (percentage < 85) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <Card className="h-full">
      <div className="flex flex-col items-center">
        <div className="text-gray-500 mb-2 flex items-center">
          <Gauge className="w-5 h-5 mr-1" />
          <span>Current Speed</span>
        </div>
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.83} 283`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
              className={getSpeedColor()}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-bold">{currentSpeed}</span>
            <span className="text-sm text-gray-500">{unit}</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Max: {maxSpeed} {unit}
        </div>
      </div>
    </Card>
  )
}

export default SpeedWidget
