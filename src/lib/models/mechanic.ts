export interface Mechanic {
  id: string;
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  contact: {
    phone: string;
    email?: string;
    website?: string;
  };
  services: string[];
  rating?: number;
  reviewsCount?: number;
  openingHours?: {
    monday?: string;
    tuesday?: string;
    // ... other days
  };
  emergencyServices: boolean;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}