"use client"

import type React from "react"
import { useState } from "react"
import type { Vehicle } from "../types/vehicle"
import { mockTrips, mockVehicles } from "../data/mockData"
import Card from "../components/ui/Card"
import Button from "../components/ui/Button"
import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Droplet,
  Filter,
  Gauge,
  RefreshCw,
  Sun,
  Thermometer,
  Wind,
  X,
} from "lucide-react"
import Badge from "../components/ui/Badge"

interface WeatherImpactProps {
  selectedVehicle: Vehicle
}

const WeatherImpact: React.FC<WeatherImpactProps> = ({ selectedVehicle = mockVehicles[0] }) => {
  // State for weather data
  const [weatherData] = useState({
    current: {
      temperature: 72,
      feelsLike: 75,
      condition: "Partly Cloudy",
      humidity: 65,
      windSpeed: 8,
      pressure: 1015,
      visibility: 10,
    },
    location: "San Francisco, CA",
    forecast: [
      {
        date: new Date(),
        highTemp: 75,
        lowTemp: 62,
        condition: "Sunny",
        windSpeed: 6,
        precipitation: 0,
      },
      {
        date: new Date(Date.now() + 86400000),
        highTemp: 73,
        lowTemp: 60,
        condition: "Cloudy",
        windSpeed: 8,
        precipitation: 10,
      },
      {
        date: new Date(Date.now() + 172800000),
        highTemp: 68,
        lowTemp: 58,
        condition: "Rainy",
        windSpeed: 12,
        precipitation: 80,
      },
      {
        date: new Date(Date.now() + 259200000),
        highTemp: 70,
        lowTemp: 59,
        condition: "Partly Cloudy",
        windSpeed: 7,
        precipitation: 20,
      },
      {
        date: new Date(Date.now() + 345600000),
        highTemp: 72,
        lowTemp: 61,
        condition: "Sunny",
        windSpeed: 5,
        precipitation: 0,
      },
    ],
  })

  // State for filters
  const [filters, setFilters] = useState({
    dateRange: "month", // 'week', 'month', 'year'
    weatherType: "all", // 'all', 'rain', 'snow', 'sunny', 'cloudy', 'windy'
  })

  // Filter trips for the selected vehicle
  const vehicleTrips = mockTrips.filter((trip) => trip.vehicleId === selectedVehicle.id)

  // Apply date range filter
  const getFilteredTrips = () => {
    const now = new Date()
    let cutoffDate: Date

    switch (filters.dateRange) {
      case "week":
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case "month":
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case "year":
        cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        break
      default:
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }

    return vehicleTrips.filter((trip) => new Date(trip.startTime) >= cutoffDate)
  }

  const filteredTrips = getFilteredTrips()

  // Calculate weather impact statistics
  const calculateWeatherImpact = () => {
    // Group trips by weather condition
    const tripsByWeather: Record<string, any[]> = {
      sunny: [],
      cloudy: [],
      rainy: [],
      snowy: [],
      windy: [],
    }

    // Assign weather condition to each trip (mock data)
    filteredTrips.forEach((trip, index) => {
      if (index % 5 === 0) tripsByWeather.snowy.push(trip)
      else if (index % 4 === 0) tripsByWeather.rainy.push(trip)
      else if (index % 3 === 0) tripsByWeather.windy.push(trip)
      else if (index % 2 === 0) tripsByWeather.cloudy.push(trip)
      else tripsByWeather.sunny.push(trip)
    })

    // Calculate average fuel efficiency by weather
    const fuelEfficiencyByWeather: Record<string, number> = {}
    Object.entries(tripsByWeather).forEach(([weather, trips]) => {
      if (trips.length > 0) {
        fuelEfficiencyByWeather[weather] = trips.reduce((sum, trip) => sum + trip.fuelEfficiency, 0) / trips.length
      } else {
        fuelEfficiencyByWeather[weather] = 0
      }
    })

    // Calculate average speed by weather
    const avgSpeedByWeather: Record<string, number> = {}
    Object.entries(tripsByWeather).forEach(([weather, trips]) => {
      if (trips.length > 0) {
        avgSpeedByWeather[weather] = trips.reduce((sum, trip) => sum + trip.averageSpeed, 0) / trips.length
      } else {
        avgSpeedByWeather[weather] = 0
      }
    })

    // Calculate trip count by weather
    const tripCountByWeather: Record<string, number> = {}
    Object.entries(tripsByWeather).forEach(([weather, trips]) => {
      tripCountByWeather[weather] = trips.length
    })

    return {
      tripsByWeather,
      fuelEfficiencyByWeather,
      avgSpeedByWeather,
      tripCountByWeather,
    }
  }

  const weatherImpact = calculateWeatherImpact()

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="w-6 h-6 text-yellow-500" />
      case "cloudy":
        return <Cloud className="w-6 h-6 text-gray-500" />
      case "rainy":
        return <CloudRain className="w-6 h-6 text-blue-500" />
      case "snowy":
        return <CloudSnow className="w-6 h-6 text-blue-300" />
      case "windy":
        return <Wind className="w-6 h-6 text-gray-500" />
      case "stormy":
        return <CloudLightning className="w-6 h-6 text-purple-500" />
      case "drizzle":
        return <CloudDrizzle className="w-6 h-6 text-blue-400" />
      default:
        return <Cloud className="w-6 h-6 text-gray-500" />
    }
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  // Clear filters
  const clearFilters = () => {
    setFilters({
      dateRange: "month",
      weatherType: "all",
    })
  }

  // Refresh weather data
  const refreshWeatherData = () => {
    // In a real app, this would fetch the latest weather data
    alert("Refreshing weather data...")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Weather Impact</h1>
        <Button variant="outline" size="sm" leftIcon={<RefreshCw size={16} />} onClick={refreshWeatherData}>
          Refresh Weather
        </Button>
      </div>

      {/* Current Weather */}
      <Card title="Current Weather Conditions">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mr-6">
              {getWeatherIcon(weatherData.current.condition)}
            </div>
            <div>
              <h3 className="text-lg font-medium">{weatherData.current.condition}</h3>
              <p className="text-sm text-gray-500">{weatherData.location}</p>
              <div className="flex items-center mt-1">
                <Thermometer className="w-4 h-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-500">
                  {weatherData.current.temperature}°F (Feels like {weatherData.current.feelsLike}°F)
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <Droplet className="w-5 h-5 text-blue-500 mb-1" />
              <div className="text-xs text-gray-500">Humidity</div>
              <div className="text-sm font-medium">{weatherData.current.humidity}%</div>
            </div>

            <div className="flex flex-col items-center">
              <Wind className="w-5 h-5 text-gray-500 mb-1" />
              <div className="text-xs text-gray-500">Wind</div>
              <div className="text-sm font-medium">{weatherData.current.windSpeed} mph</div>
            </div>

            <div className="flex flex-col items-center">
              <Gauge className="w-5 h-5 text-gray-500 mb-1" />
              <div className="text-xs text-gray-500">Pressure</div>
              <div className="text-sm font-medium">{weatherData.current.pressure} hPa</div>
            </div>

            <div className="flex flex-col items-center">
              <Cloud className="w-5 h-5 text-gray-500 mb-1" />
              <div className="text-xs text-gray-500">Visibility</div>
              <div className="text-sm font-medium">{weatherData.current.visibility} mi</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium">Filters</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last 12 Months</option>
            </select>

            <select
              className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.weatherType}
              onChange={(e) => setFilters({ ...filters, weatherType: e.target.value })}
            >
              <option value="all">All Weather Types</option>
              <option value="sunny">Sunny</option>
              <option value="cloudy">Cloudy</option>
              <option value="rainy">Rainy</option>
              <option value="snowy">Snowy</option>
              <option value="windy">Windy</option>
            </select>

            <Button variant="outline" size="sm" onClick={clearFilters} leftIcon={<X size={16} />}>
              Clear
            </Button>
          </div>
        </div>
      </Card>

      {/* Weather Impact Summary */}
      <Card title="Weather Impact Summary">
        <div className="space-y-6">
          <p className="text-sm text-gray-500 mb-4">
            See how different weather conditions affect your vehicle's performance and efficiency.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Droplet className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Fuel efficiency by weather chart would display here</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium mb-2">Fuel Efficiency by Weather Condition</div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sun className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Sunny</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">
                      {weatherImpact.fuelEfficiencyByWeather.sunny.toFixed(1)}{" "}
                      {selectedVehicle.fuelType === "electric" ? "mi/kWh" : "mpg"}
                    </span>
                    <Badge variant="success" size="sm" className="ml-2">
                      Best
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Cloud className="w-5 h-5 text-gray-500 mr-2" />
                    <span>Cloudy</span>
                  </div>
                  <div className="font-medium">
                    {weatherImpact.fuelEfficiencyByWeather.cloudy.toFixed(1)}{" "}
                    {selectedVehicle.fuelType === "electric" ? "mi/kWh" : "mpg"}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CloudRain className="w-5 h-5 text-blue-500 mr-2" />
                    <span>Rainy</span>
                  </div>
                  <div className="font-medium">
                    {weatherImpact.fuelEfficiencyByWeather.rainy.toFixed(1)}{" "}
                    {selectedVehicle.fuelType === "electric" ? "mi/kWh" : "mpg"}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CloudSnow className="w-5 h-5 text-blue-300 mr-2" />
                    <span>Snowy</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">
                      {weatherImpact.fuelEfficiencyByWeather.snowy.toFixed(1)}{" "}
                      {selectedVehicle.fuelType === "electric" ? "mi/kWh" : "mpg"}
                    </span>
                    <Badge variant="danger" size="sm" className="ml-2">
                      Worst
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Wind className="w-5 h-5 text-gray-500 mr-2" />
                    <span>Windy</span>
                  </div>
                  <div className="font-medium">
                    {weatherImpact.fuelEfficiencyByWeather.windy.toFixed(1)}{" "}
                    {selectedVehicle.fuelType === "electric" ? "mi/kWh" : "mpg"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Gauge className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Average speed by weather chart would display here</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium mb-2">Average Speed by Weather Condition</div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sun className="w-5 h-5 text-yellow-500 mr-2" />
                    <span>Sunny</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">{weatherImpact.avgSpeedByWeather.sunny.toFixed(1)} mph</span>
                    <Badge variant="success" size="sm" className="ml-2">
                      Fastest
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Cloud className="w-5 h-5 text-gray-500 mr-2" />
                    <span>Cloudy</span>
                  </div>
                  <div className="font-medium">{weatherImpact.avgSpeedByWeather.cloudy.toFixed(1)} mph</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CloudRain className="w-5 h-5 text-blue-500 mr-2" />
                    <span>Rainy</span>
                  </div>
                  <div className="font-medium">{weatherImpact.avgSpeedByWeather.rainy.toFixed(1)} mph</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CloudSnow className="w-5 h-5 text-blue-300 mr-2" />
                    <span>Snowy</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">{weatherImpact.avgSpeedByWeather.snowy.toFixed(1)} mph</span>
                    <Badge variant="danger" size="sm" className="ml-2">
                      Slowest
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Wind className="w-5 h-5 text-gray-500 mr-2" />
                    <span>Windy</span>
                  </div>
                  <div className="font-medium">{weatherImpact.avgSpeedByWeather.windy.toFixed(1)} mph</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Weather Forecast */}
      <Card title="5-Day Weather Forecast">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            Plan your trips based on upcoming weather conditions to optimize fuel efficiency and safety.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-sm font-medium mb-2">{formatDate(day.date)}</div>
                <div className="w-12 h-12 mx-auto mb-2">{getWeatherIcon(day.condition)}</div>
                <div className="text-lg font-medium">
                  {day.highTemp}° / {day.lowTemp}°
                </div>
                <div className="text-sm text-gray-500">{day.condition}</div>
                <div className="text-xs text-gray-500 mt-2">
                  <Wind className="w-3 h-3 inline mr-1" />
                  {day.windSpeed} mph
                </div>
                <div className="text-xs text-gray-500">
                  <Droplet className="w-3 h-3 inline mr-1" />
                  {day.precipitation}% precip
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Recent Trips Weather Impact */}
      <Card title="Recent Trips Weather Impact">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">
            See how weather conditions affected your recent trips and vehicle performance.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Trip
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Weather
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Efficiency
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Impact
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTrips.slice(0, 5).map((trip, index) => {
                  // Assign mock weather data
                  const weatherConditions = ["sunny", "cloudy", "rainy", "snowy", "windy"]
                  const weatherCondition = weatherConditions[index % 5]

                  // Calculate mock impact
                  const baseEfficiency = trip.fuelEfficiency
                  let impactPercent = 0

                  if (weatherCondition === "sunny") impactPercent = 5
                  else if (weatherCondition === "cloudy") impactPercent = -2
                  else if (weatherCondition === "rainy") impactPercent = -8
                  else if (weatherCondition === "snowy") impactPercent = -15
                  else if (weatherCondition === "windy") impactPercent = -5

                  return (
                    <tr key={trip.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(trip.startTime).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {trip.startLocation} to {trip.endLocation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getWeatherIcon(weatherCondition)}
                          <span className="ml-2 capitalize">{weatherCondition}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {trip.fuelEfficiency.toFixed(1)} {selectedVehicle.fuelType === "electric" ? "mi/kWh" : "mpg"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={impactPercent > 0 ? "success" : impactPercent < -10 ? "danger" : "warning"}
                          size="sm"
                        >
                          {impactPercent > 0 ? "+" : ""}
                          {impactPercent}%
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Weather Driving Tips */}
      <Card title="Weather Driving Tips">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <CloudRain className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Rainy Conditions</h4>
              <p className="text-sm text-gray-600">
                Slow down and increase following distance. Use headlights and avoid sudden braking or acceleration.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <CloudSnow className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Snowy Conditions</h4>
              <p className="text-sm text-gray-600">
                Reduce speed significantly. Accelerate and decelerate slowly. Increase following distance to 8-10
                seconds.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Wind className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Windy Conditions</h4>
              <p className="text-sm text-gray-600">
                Keep both hands on the wheel. Be prepared for gusts, especially when passing large vehicles or on
                bridges.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default WeatherImpact
