import type React from "react"
import Card from "../ui/Card"
import { AlertTriangle } from "lucide-react"

interface TirePressureWidgetProps {
  tirePressure: {
    frontLeft: number
    frontRight: number
    rearLeft: number
    rearRight: number
  }
  recommendedPressure?: number
}

const TirePressureWidget: React.FC<TirePressureWidgetProps> = ({ tirePressure, recommendedPressure = 32 }) => {
  // Function to determine if pressure is low or high
  const getPressureStatus = (pressure: number) => {
    const lowThreshold = recommendedPressure - 5
    const highThreshold = recommendedPressure + 5

    if (pressure < lowThreshold) return "low"
    if (pressure > highThreshold) return "high"
    return "normal"
  }

  // Function to get color based on pressure status
  const getPressureColor = (pressure: number) => {
    const status = getPressureStatus(pressure)
    if (status === "normal") return "text-green-500"
    if (status === "low") return "text-red-500"
    return "text-yellow-500"
  }

  return (
    <Card className="h-full">
      <div className="flex flex-col">
        <div className="text-gray-500 mb-4 text-center">Tire Pressure (PSI)</div>

        <div className="grid grid-cols-2 gap-8">
          {/* Front tires */}
          <div className="flex flex-col items-center">
            <div className={`text-xl font-bold ${getPressureColor(tirePressure.frontLeft)}`}>
              {tirePressure.frontLeft}
              {getPressureStatus(tirePressure.frontLeft) !== "normal" && (
                <AlertTriangle className="inline-block ml-1 w-4 h-4" />
              )}
            </div>
            <div className="text-sm text-gray-500 mt-1">Front Left</div>
          </div>

          <div className="flex flex-col items-center">
            <div className={`text-xl font-bold ${getPressureColor(tirePressure.frontRight)}`}>
              {tirePressure.frontRight}
              {getPressureStatus(tirePressure.frontRight) !== "normal" && (
                <AlertTriangle className="inline-block ml-1 w-4 h-4" />
              )}
            </div>
            <div className="text-sm text-gray-500 mt-1">Front Right</div>
          </div>

          {/* Car outline */}
          <div className="col-span-2 my-2 flex justify-center">
            <div className="w-24 h-12 border-2 border-gray-300 rounded-lg"></div>
          </div>

          {/* Rear tires */}
          <div className="flex flex-col items-center">
            <div className={`text-xl font-bold ${getPressureColor(tirePressure.rearLeft)}`}>
              {tirePressure.rearLeft}
              {getPressureStatus(tirePressure.rearLeft) !== "normal" && (
                <AlertTriangle className="inline-block ml-1 w-4 h-4" />
              )}
            </div>
            <div className="text-sm text-gray-500 mt-1">Rear Left</div>
          </div>

          <div className="flex flex-col items-center">
            <div className={`text-xl font-bold ${getPressureColor(tirePressure.rearRight)}`}>
              {tirePressure.rearRight}
              {getPressureStatus(tirePressure.rearRight) !== "normal" && (
                <AlertTriangle className="inline-block ml-1 w-4 h-4" />
              )}
            </div>
            <div className="text-sm text-gray-500 mt-1">Rear Right</div>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">Recommended: {recommendedPressure} PSI</div>
      </div>
    </Card>
  )
}

export default TirePressureWidget
