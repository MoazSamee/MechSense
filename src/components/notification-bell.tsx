"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Notification = {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "error"
  time: string
  read: boolean
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Low Tire Pressure",
      message: "Front left tire pressure is low (26 PSI)",
      type: "warning",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Oil Change Due",
      message: "Scheduled maintenance: Oil change due in 500 miles",
      type: "info",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "3",
      title: "Battery Warning",
      message: "Battery voltage is low (11.8V)",
      type: "error",
      time: "Yesterday",
      read: false,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex items-center justify-between border-b pb-2">
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="space-y-2 pt-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex cursor-pointer flex-col gap-1 rounded-md p-2 transition-colors",
                    notification.read ? "bg-background" : "bg-muted hover:bg-muted/80",
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-center justify-between">
                    <h5
                      className={cn(
                        "text-sm font-medium",
                        notification.type === "error" && "text-destructive",
                        notification.type === "warning" && "text-amber-500",
                        notification.type === "info" && "text-blue-500",
                      )}
                    >
                      {notification.title}
                    </h5>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-sm text-muted-foreground">No notifications</div>
          )}
        </div>
        <div className="border-t pt-2 text-center">
          <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
            <a href="/notifications">View all notifications</a>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

