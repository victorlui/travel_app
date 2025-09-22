export interface TravelFormData {
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  budget: number | null;
}

export interface TravelFormErrors {
  destination?: string;
  startDate?: string;
  endDate?: string;
  budget?: string;
}

export interface TravelItinerary {
  id: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  activities: Activity[];
  accommodations: Accommodation[];
  transportation: Transportation[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  date: Date;
  cost: number;
  location: string;
}

export interface Accommodation {
  id: string;
  name: string;
  type: 'hotel' | 'hostel' | 'apartment' | 'resort';
  checkIn: Date;
  checkOut: Date;
  cost: number;
  location: string;
}

export interface Transportation {
  id: string;
  type: 'flight' | 'bus' | 'train' | 'car' | 'taxi';
  from: string;
  to: string;
  date: Date;
  cost: number;
}