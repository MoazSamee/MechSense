import type React from "react"
import Card from "../ui/Card"
import { Cloud, Droplet, Wind, Eye } from "lucide-react"
import type { WeatherData } from "../../types/vehicle"
import Badge from "../ui/Badge"

interface WeatherWidgetProps {
  weatherData: WeatherData
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weatherData }) => {
  // Get risk badge variant
  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "high":
        return "danger"
      case "moderate":
        return "warning"
      case "low":
        return "success"
      default:
        return "default"
    }
  }

  return (
    <Card className="h-full">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-500 flex items-center">
            <Cloud className="w-5 h-5 mr-1" />
            <span>Weather Conditions</span>
          </div>
          <Badge variant={getRiskBadgeVariant(weatherData.drivingRisk)} size="sm">
            {weatherData.drivingRisk} risk
          </Badge>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="text-4xl font-bold">{weatherData.temperature}°</div>
            <div className="ml-2">
              <div className="text-sm font-medium">{weatherData.condition}</div>
              <div className="text-xs text-gray-500">Driving conditions</div>
            </div>
          </div>
          <div className="text-4xl">
            {weatherData.icon === "partly-cloudy" && "⛅"}
            {weatherData.icon === "sunny" && "☀️"}
            {weatherData.icon === "rainy" && "🌧️"}
            {weatherData.icon === "snowy" && "❄️"}
            {weatherData.icon === "stormy" && "⛈️"}
            {!["partly-cloudy", "sunny", "rainy", "snowy", "stormy"].includes(weatherData.icon) && "🌤️"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center">
            <Droplet className="w-4 h-4 text-blue-500 mr-2" />
            <div>
              <div className="text-xs text-gray-500">Humidity</div>
              <div className="text-sm font-medium">{weatherData.humidity}%</div>
            </div>
          </div>
          <div className="flex items-center">
            <Wind className="w-4 h-4 text-blue-500 mr-2" />
            <div>
              <div className="text-xs text-gray-500">Wind</div>
              <div className="text-sm font-medium">{weatherData.windSpeed} mph</div>
            </div>
          </div>
          <div className="flex items-center">
            <Droplet className="w-4 h-4 text-blue-500 mr-2" />
            <div>
              <div className="text-xs text-gray-500">Precipitation</div>
              <div className="text-sm font-medium">{weatherData.precipitation}%</div>
            </div>
          </div>
          <div className="flex items-center">
            <Eye className="w-4 h-4 text-blue-500 mr-2" />
            <div>
              <div className="text-xs text-gray-500">Visibility</div>
              <div className="text-sm font-medium">{weatherData.visibility} mi</div>
            </div>
          </div>
        </div>

        {weatherData.recommendations.length > 0 && (
          <div className="mt-2">
            <h4 className="text-xs font-medium text-gray-500 mb-1">Driving Recommendations:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {weatherData.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-1">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  )
}

export default WeatherWidget
