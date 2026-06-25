import { atom } from 'nanostores';

export interface HereNowConnection {
  // Bearer API key. Empty string = anonymous mode (24h expiry sites). A key makes sites permanent.
  token: string;
}

// Initialize with stored connection or environment variable.
const storedConnection = typeof window !== 'undefined' ? localStorage.getItem('herenow_connection') : null;
const envToken = import.meta.env.VITE_HERENOW_API_KEY;

const initialConnection: HereNowConnection = storedConnection
  ? JSON.parse(storedConnection)
  : {
      token: envToken || '',
    };

export const herenowConnection = atom<HereNowConnection>(initialConnection);

export const updateHereNowConnection = (updates: Partial<HereNowConnection>) => {
  const currentState = herenowConnection.get();
  const newState = { ...currentState, ...updates };
  herenowConnection.set(newState);

  if (typeof window !== 'undefined') {
    localStorage.setItem('herenow_connection', JSON.stringify(newState));
  }
};
