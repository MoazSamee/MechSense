export interface Trip {
  id: string;
  vehicleId: string;
  userId: string;
  startTime: firebase.firestore.Timestamp;
  endTime: firebase.firestore.Timestamp;
  startLocation: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  endLocation: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  distance: number; // km or miles
  duration: number; // minutes
  fuelUsed: number; // liters or gallons
  averageSpeed: number; // km/h or mph
  maxSpeed: number; // km/h or mph
  ecoScore: number; // 0-100
  drivingBehavior: {
    harshBrakingCount: number;
    rapidAccelerationCount: number;
    sharpCorneringCount: number;
    speedingCount: number;
  };
  weather?: {
    condition?: 'clear' | 'rain' | 'snow' | 'fog' | 'wind';
    temperature?: number;
    humidity?: number;
  };
  notes?: string;
  createdAt: firebase.firestore.Timestamp;
}