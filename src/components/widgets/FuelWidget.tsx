import type React from "react"
import Card from "../ui/Card"
import { Droplet } from "lucide-react"

interface FuelWidgetProps {
  fuelLevel: number
  fuelType: "gasoline" | "diesel" | "electric" | "hybrid"
  range?: number
}

const FuelWidget: React.FC<FuelWidgetProps> = ({ fuelLevel, fuelType, range }) => {
  // Determine color based on fuel level
  const getFuelColor = () => {
    if (fuelLevel > 50) return "bg-green-500"
    if (fuelLevel > 20) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Get fuel type label
  const getFuelTypeLabel = () => {
    switch (fuelType) {
      case "gasoline":
        return "Gas"
      case "diesel":
        return "Diesel"
      case "electric":
        return "Electric"
      case "hybrid":
        return "Hybrid"
      default:
        return "Fuel"
    }
  }

  return (
    <Card className="h-full">
      <div className="flex flex-col items-center">
        <div className="text-gray-500 mb-2 flex items-center">
          <Droplet className="w-5 h-5 mr-1" />
          <span>{getFuelTypeLabel()} Level</span>
        </div>
        <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getFuelColor()} transition-all duration-500 ease-out`}
            style={{ width: `${fuelLevel}%` }}
          ></div>
        </div>
        <div className="mt-2 text-2xl font-bold">{fuelLevel}%</div>
        {range && <div className="mt-1 text-sm text-gray-500">Est. Range: {range} miles</div>}
        <div className="mt-2 text-xs text-gray-400">{fuelType === "electric" ? "Battery" : "Fuel tank"} status</div>
      </div>
    </Card>
  )
}

export default FuelWidget
