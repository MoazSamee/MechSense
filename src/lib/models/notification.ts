export interface Notification {
  id: string;
  userId: string;
  vehicleId?: string;
  type: 'maintenance' | 'alert' | 'emergency' | 'behavior' | 'system';
  title: string;
  message: string;
  data?: {
    // Additional context-specific data
    maintenanceType?: string;
    alertType?: string;
    tripId?: string;
    location?: {
      latitude?: number;
      longitude?: number;
    };
  };
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: firebase.firestore.Timestamp;
}