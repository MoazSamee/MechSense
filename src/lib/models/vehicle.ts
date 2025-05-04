export interface Vehicle {
  id: string;
  userId: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  color?: string;
  fuelType: 'gasoline' | 'diesel' | 'hybrid' | 'electric';
  odometer: number;
  imageUrl?: string;
  insurance?: {
    provider?: string;
    policyNumber?: string;
    expiryDate?: firebase.firestore.Timestamp;
  };
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}

export interface VehicleHealth {
  vehicleId: string;
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  engine: {
    status: 'normal' | 'warning' | 'critical';
    temperature: number; // °C or °F
    oilLevel: 'low' | 'normal' | 'high';
    oilLife: number; // percentage
  };
  battery: {
    health: number; // percentage
    voltage: number;
    charging: boolean;
    timeToReplace?: firebase.firestore.Timestamp;
  };
  tires: {
    frontLeft: {
      pressure: number; // PSI or kPa
      treadDepth: number; // mm or inches
      status: 'normal' | 'low' | 'high' | 'flat';
    };
    frontRight: {
      pressure: number;
      treadDepth: number;
      status: 'normal' | 'low' | 'high' | 'flat';
    };
    rearLeft: {
      pressure: number;
      treadDepth: number;
      status: 'normal' | 'low' | 'high' | 'flat';
    };
    rearRight: {
      pressure: number;
      treadDepth: number;
      status: 'normal' | 'low' | 'high' | 'flat';
    };
  };
  fuel: {
    level: number; // percentage
    range: number; // km or miles
    efficiency: number; // km/L or MPG
  };
  diagnostics?: {
    checkEngineLight: boolean;
    errorCodes?: string[];
    lastScan?: firebase.firestore.Timestamp;
  };
  lastUpdated: firebase.firestore.Timestamp;
}