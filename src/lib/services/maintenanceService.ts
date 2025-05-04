import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { MaintenanceRecord, MaintenanceSchedule } from '@/lib/models/maintenance';

export const getMaintenanceRecords = async (
  userId: string,
  vehicleId: string
): Promise<MaintenanceRecord[]> => {
  const maintenanceRef = collection(db, 'users', userId, 'vehicles', vehicleId, 'maintenance');
  const q = query(maintenanceRef, orderBy('datePerformed', 'desc'));
  const maintenanceSnap = await getDocs(q);
  return maintenanceSnap.docs.map(doc =>