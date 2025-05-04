export interface FuelRecord {
  id: string;
  vehicleId: string;
  userId: string;
  date: firebase.firestore.Timestamp;
  amount: number; // liters or gallons
  costPerUnit: number;
  totalCost: number;
  odometerReading: number;
  fuelType: 'regular' | 'premium' | 'diesel' | 'electric';
  station?: {
    name?: string;
    location?: {
      latitude?: number;
      longitude?: number;
      address?: string;
    };
  };
  notes?: string;
  isFullTank: boolean;
  estimatedEfficiency?: number; // km/L or MPG
  createdAt: firebase.firestore.Timestamp;
}