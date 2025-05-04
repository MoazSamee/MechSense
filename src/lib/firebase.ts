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
    wednesday?: string;
    thursday?:  string;
    friday?:    string;
    saturday?: string;
    sunday?: string;
  };
  emergencyServices: boolean;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}