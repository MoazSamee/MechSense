import type React from "react"
import Card from "../ui/Card"
import { Map, Calendar, Clock, Droplet } from "lucide-react"
import type { Trip } from "../../types/vehicle"
import { Link } from "react-router-dom"

interface TripsWidgetProps {
  trips: Trip[]
  maxTrips?: number
}

const TripsWidget: React.FC<TripsWidgetProps> = ({ trips, maxTrips = 3 }) => {
  // Sort trips by date (most recent first)
  const sortedTrips = [...trips].sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())

  const displayTrips = sortedTrips.slice(0, maxTrips)

  // Format date to be more readable
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      weekday: "short",
    })
  }

  // Format time to be more readable
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Format duration in hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours === 0) return `${mins}m`
    return `${hours}h ${mins}m`
  }

  return (
    <Card className="h-full">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-500 flex items-center">
            <Map className="w-5 h-5 mr-1" />
            <span>Recent Trips</span>
          </div>
        </div>

        {displayTrips.length > 0 ? (
          <div className="space-y-4">
            {displayTrips.map((trip) => (
              <div key={trip.id} className="p-3 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                    <span className="text-sm">{formatDate(trip.startTime)}</span>
                  </div>
                  <div className="text-sm font-medium">{trip.distance.toFixed(1)} mi</div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500">From</div>
                    <div className="text-sm font-medium truncate">{trip.startLocation}</div>
                  </div>
                  <div className="mx-2 text-gray-300">→</div>
                  <div className="flex-1 text-right">
                    <div className="text-xs text-gray-500">To</div>
                    <div className="text-sm font-medium truncate">{trip.endLocation}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{formatDuration(trip.duration)}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span>{trip.averageSpeed} mph avg</span>
                  </div>
                  <div className="flex items-center justify-end">
                    <Droplet className="w-3 h-3 mr-1" />
                    <span>{trip.fuelEfficiency > 0 ? `${trip.fuelEfficiency} mpg` : "Electric"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <div className="mb-2">
              <Map className="w-8 h-8 mx-auto text-gray-300" />
            </div>
            <p>No recent trips recorded</p>
          </div>
        )}

        {trips.length > maxTrips && (
          <div className="mt-4 text-center">
            <Link to="/trips" className="text-sm text-blue-500 hover:text-blue-700">
              View all {trips.length} trips
            </Link>
          </div>
        )}
      </div>
    </Card>
  )
}

export default TripsWidget
