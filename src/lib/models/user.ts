export interface User {
  id: string; // Firebase auth uid
  email: string;
  name: string;
  phone?: string;
  photoURL?: string;
  preferences: {
    language: 'en' | 'es' | 'fr' | 'de'; // Supported languages
    theme: 'light' | 'dark' | 'system';
    unitSystem: 'metric' | 'imperial';
    notificationPreferences: {
      maintenanceAlerts: boolean;
      speedAlerts: boolean;
      batteryAlerts: boolean;
      tirePressureAlerts: boolean;
      emergencyAlerts: boolean;
      parkingReminders: boolean;
    };
    dashboardWidgets: string[]; // Array of widget IDs to show
  };
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
}