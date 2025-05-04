"use client"

import type React from "react"
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react"

interface AlertProps {
  type: "info" | "warning" | "error" | "success"
  title?: string
  message: string
  onClose?: () => void
  className?: string
}

const Alert: React.FC<AlertProps> = ({ type, title, message, onClose, className = "" }) => {
  const icons = {
    info: <Info className="h-5 w-5 text-blue-400" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
    error: <AlertCircle className="h-5 w-5 text-red-400" />,
    success: <CheckCircle className="h-5 w-5 text-green-400" />,
  }

  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    error: "bg-red-50 border-red-200 text-red-800",
    success: "bg-green-50 border-green-200 text-green-800",
  }

  return (
    <div className={`rounded-md border p-4 ${styles[type]} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="ml-3 flex-1">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className={`text-sm ${title ? "mt-2" : ""}`}>{message}</div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${type === "info" ? "text-blue-500 hover:bg-blue-100 focus:ring-blue-600" : ""}
                  ${type === "warning" ? "text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600" : ""}
                  ${type === "error" ? "text-red-500 hover:bg-red-100 focus:ring-red-600" : ""}
                  ${type === "success" ? "text-green-500 hover:bg-green-100 focus:ring-green-600" : ""}
                `}
              >
                <span className="sr-only">Dismiss</span>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Alert
