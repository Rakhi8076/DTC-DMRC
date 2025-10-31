export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  gender: 'male' | 'female' | 'other';
  role: 'passenger' | 'admin' | 'conductor';
}

export interface BusRoute {
  id: string;
  routeNumber: string;
  routeName: string;
  source: string;
  destination: string;
  distanceKm: number;
  estimatedDuration: number;
  busType: 'AC' | 'Non-AC' | 'Electric';
  farePerKm: number;
  isActive: boolean;
}

export interface BusStop {
  id: string;
  stopName: string;
  latitude: number;
  longitude: number;
  area: string;
}

export interface RouteStop {
  id: string;
  routeId: string;
  stopId: string;
  stopSequence: number;
  distanceFromStart: number;
  stop?: BusStop;
}

export interface Bus {
  id: string;
  busNumber: string;
  routeId?: string;
  capacity: number;
  busType: 'AC' | 'Non-AC' | 'Electric';
  currentLatitude?: number;
  currentLongitude?: number;
  isActive: boolean;
  lastUpdated: Date;
  route?: BusRoute;
}

export interface Pass {
  id: string;
  userId: string;
  passType: 'monthly' | 'quarterly' | 'annual';
  isFree: boolean;
  validFrom: Date;
  validUntil: Date;
  amountPaid: number;
  qrCode: string;
  isActive: boolean;
}

export interface Ticket {
  id: string;
  userId: string;
  routeId: string;
  fromStopId: string;
  toStopId: string;
  fareAmount: number;
  isFree: boolean;
  bookingTime: Date;
  journeyDate: Date;
  qrCode: string;
  isValidated: boolean;
  validatedAt?: Date;
  route?: BusRoute;
  fromStop?: BusStop;
  toStop?: BusStop;
}

export interface CrowdData {
  id: string;
  areaName: string;
  stopId?: string;
  crowdLevel: 'low' | 'medium' | 'high' | 'critical';
  passengerCount: number;
  recommendedFrequency: number;
  updatedAt: Date;
  updatedBy?: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdBy: string;
  createdAt: Date;
  expiresAt?: Date;
  isActive: boolean;
}

export interface BusSchedule {
  id: string;
  routeId: string;
  busId?: string;
  departureTime: string;
  daysOfWeek: string[];
  isActive: boolean;
}
