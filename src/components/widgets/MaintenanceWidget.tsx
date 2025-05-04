import type React from "react"
import Card from "../ui/Card"
import { PenToolIcon as Tool, Calendar } from "lucide-react"
import type { MaintenanceItem } from "../../types/vehicle"
import Badge from "../ui/Badge"
import { Link } from "react-router-dom"

interface MaintenanceWidgetProps {
  maintenanceItems: MaintenanceItem[]
  maxItems?: number
}

const MaintenanceWidget: React.FC<MaintenanceWidgetProps> = ({ maintenanceItems, maxItems = 3 }) => {
  // Sort by priority and status
  const sortedItems = [...maintenanceItems].sort((a, b) => {
    // First by status (overdue > due > upcoming > completed)
    const statusOrder = { overdue: 0, due: 1, upcoming: 2, completed: 3 }
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status]
    }

    // Then by priority (high > medium > low)
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  const displayItems = sortedItems.slice(0, maxItems)

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "overdue":
        return "danger"
      case "due":
        return "warning"
      case "upcoming":
        return "primary"
      case "completed":
        return "success"
      default:
        return "default"
    }
  }

  // Format date to be more readable
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card className="h-full">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-500 flex items-center">
            <Tool className="w-5 h-5 mr-1" />
            <span>Maintenance Schedule</span>
          </div>
        </div>

        {displayItems.length > 0 ? (
          <div className="space-y-4">
            {displayItems.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-md border-l-4 ${
                  item.status === "overdue"
                    ? "border-red-400 bg-red-50"
                    : item.status === "due"
                      ? "border-yellow-400 bg-yellow-50"
                      : item.status === "upcoming"
                        ? "border-blue-400 bg-blue-50"
                        : "border-green-400 bg-green-50"
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      <Badge variant={getStatusBadgeVariant(item.status)} size="sm">
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>Due: {formatDate(item.dueDate)}</span>
                      <span className="mx-2">|</span>
                      <span>Mileage: {item.dueMileage.toLocaleString()} mi</span>
                      {item.estimatedCost && (
                        <>
                          <span className="mx-2">|</span>
                          <span>Est. Cost: ${item.estimatedCost}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <div className="mb-2">
              <Tool className="w-8 h-8 mx-auto text-gray-300" />
            </div>
            <p>No maintenance items scheduled</p>
          </div>
        )}

        {maintenanceItems.length > maxItems && (
          <div className="mt-4 text-center">
            <Link to="/maintenance" className="text-sm text-blue-500 hover:text-blue-700">
              View all {maintenanceItems.length} maintenance items
            </Link>
          </div>
        )}
      </div>
    </Card>
  )
}

export default MaintenanceWidget
