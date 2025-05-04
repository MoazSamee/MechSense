import type React from "react"
import Card from "../ui/Card"
import { AlertCircle, Bell } from "lucide-react"
import type { Alert as AlertType } from "../../types/vehicle"
import Badge from "../ui/Badge"
import { Link } from "react-router-dom"

interface AlertsWidgetProps {
  alerts: AlertType[]
  maxAlerts?: number
}

const AlertsWidget: React.FC<AlertsWidgetProps> = ({ alerts, maxAlerts = 3 }) => {
  // Filter to show only unread alerts first, then limit by maxAlerts
  const displayAlerts = [...alerts].sort((a, b) => (a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1)).slice(0, maxAlerts)

  // Get alert type badge variant
  const getAlertBadgeVariant = (type: string) => {
    switch (type) {
      case "critical":
        return "danger"
      case "warning":
        return "warning"
      case "info":
        return "primary"
      default:
        return "default"
    }
  }

  return (
    <Card className="h-full">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-500 flex items-center">
            <Bell className="w-5 h-5 mr-1" />
            <span>Recent Alerts</span>
          </div>
          {alerts.length > 0 && (
            <Badge variant="danger" size="sm">
              {alerts.filter((a) => !a.isRead).length}
            </Badge>
          )}
        </div>

        {displayAlerts.length > 0 ? (
          <div className="space-y-3">
            {displayAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-md ${alert.isRead ? "bg-gray-50" : "bg-red-50 border-l-4 border-red-400"}`}
              >
                <div className="flex items-start">
                  <AlertCircle
                    className={`w-5 h-5 mr-2 ${alert.type === "critical" ? "text-red-500" : alert.type === "warning" ? "text-yellow-500" : "text-blue-500"}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{alert.title}</h4>
                      <Badge variant={getAlertBadgeVariant(alert.type)} size="sm">
                        {alert.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{alert.message}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-400">{new Date(alert.timestamp).toLocaleString()}</span>
                      {alert.actionRequired && (
                        <span className="text-xs text-blue-500 font-medium cursor-pointer">
                          {alert.actionText || "Take Action"}
                        </span>
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
              <Bell className="w-8 h-8 mx-auto text-gray-300" />
            </div>
            <p>No alerts at this time</p>
          </div>
        )}

        {alerts.length > maxAlerts && (
          <div className="mt-3 text-center">
            <Link to="/alerts" className="text-sm text-blue-500 hover:text-blue-700">
              View all {alerts.length} alerts
            </Link>
          </div>
        )}
      </div>
    </Card>
  )
}

export default AlertsWidget
