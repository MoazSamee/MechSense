export interface Vehicle {
  id: string
  name: string
  make: string
  model: string
  year: number
  licensePlate: string
  fuelType: "gasoline" | "diesel" | "electric" | "hybrid"
  fuelLevel: number // percentage
  batteryLevel?: number // percentage for electric/hybrid
  batteryHealth?: number // percentage for electric/hybrid
  mileage: number
  lastService: Date
  nextServiceDue: Date
  nextServiceMileage: number
  tirePressure: {
    frontLeft: number
    frontRight: number
    rearLeft: number
    rearRight: number
  }
  engineStatus: "normal" | "warning" | "critical"
  location?: {
    latitude: number
    longitude: number
    address?: string
  }
  image: string
}

export interface Alert {
  id: string
  vehicleId: string
  type: "warning" | "critical" | "info"
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  category: "engine" | "battery" | "tire" | "fuel" | "maintenance" | "other"
  actionRequired?: boolean
  actionText?: string
}

export interface MaintenanceItem {
  id: string
  vehicleId: string
  title: string
  description: string
  dueDate: Date
  dueMileage: number
  status: "upcoming" | "due" | "overdue" | "completed"
  priority: "low" | "medium" | "high"
  estimatedCost?: number
  completedDate?: Date
}

export interface Trip {
  id: string
  vehicleId: string
  startTime: Date
  endTime: Date
  startLocation: string
  endLocation: string
  distance: number // in miles or km
  duration: number // in minutes
  averageSpeed: number
  maxSpeed: number
  fuelConsumed: number
  fuelEfficiency: number // mpg or l/100km
  route?: {
    latitude: number
    longitude: number
  }[]
  driverScore?: number // 0-100
}

export interface DiagnosticCode {
  id: string
  vehicleId: string
  code: string
  description: string
  severity: "low" | "medium" | "high"
  timestamp: Date
  status: "active" | "resolved"
  possibleCauses: string[]
  recommendedAction: string
}

export interface MechanicService {
  id: string
  name: string
  address: string
  phone: string
  rating: number // 0-5
  distance: number // miles or km from current location
  specialties: string[]
  availability: {
    nextAvailable: Date
    isOpen: boolean
    hours?: string
  }
  pricing?: {
    hourlyRate?: number
    diagnosticFee?: number
  }
  location: {
    latitude: number
    longitude: number
  }
}

export interface WeatherData {
  temperature: number
  condition: string
  precipitation: number
  windSpeed: number
  humidity: number
  visibility: number
  icon: string
  drivingRisk: "low" | "moderate" | "high"
  recommendations: string[]
}

export interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  preferredLanguage: string
  notificationPreferences: {
    email: boolean
    push: boolean
    sms: boolean
  }
  emergencyContacts: {
    name: string
    phone: string
    relationship: string
  }[]
}

export interface DashboardWidget {
  id: string
  type: "speed" | "fuel" | "battery" | "tirePressure" | "alerts" | "maintenance" | "weather" | "trips" | "diagnostics"
  title: string
  size: "small" | "medium" | "large"
  position: number
  isVisible: boolean
}
