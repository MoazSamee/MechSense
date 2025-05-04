export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  userId: string;
  type: 'oil' | 'tire' | 'brake' | 'battery' | 'filter' | 'inspection' | 'other';
  title: string;
  description?: string;
  datePerformed: firebase.firestore.Timestamp;
  mileage: number;
  cost?: number;
  receiptImageUrl?: string;
  serviceCenter?: {
    name?: string;
    location?: string;
    contact?: string;
  };
  parts?: {
    name: string;
    partNumber?: string;
    warrantyExpiry?: firebase.firestore.Timestamp;
  }[];
  nextService?: {
    mileage?: number;
    date?: firebase.firestore.Timestamp;
  };
  createdAt: firebase.firestore.Timestamp;
}

export interface MaintenanceSchedule {
  vehicleId: string;
  userId: string;
  upcomingServices: {
    oilChange: {
      dueMileage: number;
      dueDate: firebase.firestore.Timestamp;
      lastChangedMileage: number;
      lastChangedDate: firebase.firestore.Timestamp;
    };
    tireRotation: {
      dueMileage: number;
      dueDate: firebase.firestore.Timestamp;
      lastChangedMileage: number;
      lastChangedDate: firebase.firestore.Timestamp;
    };
    batteryCheck: {
      dueDate: firebase.firestore.Timestamp;
      lastCheckedDate: firebase.firestore.Timestamp;
    };
    // Add other scheduled maintenance items
  };
  predictiveMaintenance?: {
    component: string;
    issue: string;
    severity: 'low' | 'medium' | 'high';
    estimatedFailureMileage?: number;
    estimatedFailureDate?: firebase.firestore.Timestamp;
    recommendedAction: string;
  }[];
  lastUpdated: firebase.firestore.Timestamp;
}