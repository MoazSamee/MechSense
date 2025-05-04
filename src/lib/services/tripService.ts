import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { Trip } from '@/lib/models/trip';

export const getTrips = async (userId: string, vehicleId: string): Promise<Trip[]> => {
  const tripsRef = collection(db, 'users', userId, 'vehicles', vehicleId, 'trips');
  const q = query(tripsRef, orderBy('startTime', 'desc'));
  const tripsSnap = await getDocs(q);
  return tripsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Trip));
};

export const startTrip = async (
  userId: string,
  vehicleId: string,
  startLocation: { latitude: number; longitude: number }
): Promise<string> => {
  const tripRef = collection(db, 'users', userId, 'vehicles', vehicleId, 'trips');
  const tripDoc = await addDoc(tripRef, {
    userId,
    vehicleId,
    startTime: new Date(),
    startLocation,
    status: 'in_progress',
    createdAt: new Date(),
  });
  return tripDoc.id;
};

export const endTrip = async (
  userId: string,
  vehicleId: string,
  tripId: string,
  tripData: {
    endLocation: { latitude: number; longitude: number };
    distance: number;
    duration: number;
    fuelUsed: number;
    drivingBehavior: {
      harshBrakingCount: number;
      rapidAccelerationCount: number;
      sharpCorneringCount: number;
      speedingCount: number;
    };
  }
): Promise<void> => {
  const tripRef = doc(db, 'users', userId, 'vehicles', vehicleId, 'trips', tripId);
  await updateDoc(tripRef, {
    ...tripData,
    endTime: new Date(),
    status: 'completed',
    ecoScore: calculateEcoScore(tripData.drivingBehavior),
  });
};

const calculateEcoScore = (behavior: {
  harshBrakingCount: number;
  rapidAccelerationCount: number;
  sharpCorneringCount: number;
  speedingCount: number;
}): number => {
  // Implement your eco score calculation logic
  return 80; // Example score
};

export const listenToActiveTrip = (
  userId: string,
  vehicleId: string,
  callback: (trip: Trip | null) => void
) => {
  const tripsRef = collection(db, 'users', userId, 'vehicles', vehicleId, 'trips');
  const q = query(tripsRef, where('status', '==', 'in_progress'), limit(1));
  
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs[0]?.data() as Trip || null);
  });
};