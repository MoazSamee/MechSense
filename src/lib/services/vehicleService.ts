import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  FirestoreDataConverter,
} from 'firebase/firestore';
import { Vehicle, VehicleHealth } from '@/lib/models/vehicle';

const vehicleConverter: FirestoreDataConverter<Vehicle> = {
  toFirestore(vehicle) {
    return vehicle;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return data as Vehicle;
  },
};

export const getVehicle = async (userId: string, vehicleId: string): Promise<Vehicle | null> => {
  const vehicleRef = doc(db, 'users', userId, 'vehicles', vehicleId).withConverter(vehicleConverter);
  const vehicleSnap = await getDoc(vehicleRef);
  return vehicleSnap.exists() ? vehicleSnap.data() : null;
};

export const getVehicles = async (userId: string): Promise<Vehicle[]> => {
  const vehiclesRef = collection(db, 'users', userId, 'vehicles').withConverter(vehicleConverter);
  const vehiclesSnap = await getDocs(vehiclesRef);
  return vehiclesSnap.docs.map(doc => doc.data());
};

export const listenToVehicleHealth = (
  userId: string,
  vehicleId: string,
  callback: (health: VehicleHealth | null) => void
) => {
  const healthRef = doc(db, 'users', userId, 'vehicles', vehicleId, 'health', 'current');
  return onSnapshot(healthRef, (snap) => {
    callback(snap.exists() ? (snap.data() as VehicleHealth) : null);
  });
};

export const updateVehicleOdometer = async (
  userId: string,
  vehicleId: string,
  odometer: number
): Promise<void> => {
  const vehicleRef = doc(db, 'users', userId, 'vehicles', vehicleId);
  await updateDoc(vehicleRef, { odometer, updatedAt: new Date() });
};

export const requestEmergencyAssistance = async (
  userId: string,
  vehicleId: string,
  location: { latitude: number; longitude: number }
): Promise<void> => {
  // Create emergency notification
  const notificationRef = doc(collection(db, 'users', userId, 'notifications'));
  await setDoc(notificationRef, {
    userId,
    vehicleId,
    type: 'emergency',
    title: 'Emergency Assistance Requested',
    message: 'Your request for roadside assistance has been received.',
    data: {
      location,
    },
    read: false,
    priority: 'high',
    createdAt: new Date(),
  });

  // Update vehicle status if needed
  const vehicleRef = doc(db, 'users', userId, 'vehicles', vehicleId);
  await updateDoc(vehicleRef, {
    status: 'needs_assistance',
    lastUpdated: new Date(),
  });
};