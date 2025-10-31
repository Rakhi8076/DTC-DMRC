import { BusRoute, BusStop, Bus, RouteStop, Announcement } from '../types';

export const mockBusStops: BusStop[] = [
  { id: '1', stopName: 'Kashmere Gate', latitude: 28.6692, longitude: 77.2279, area: 'Central Delhi' },
  { id: '2', stopName: 'ISBT', latitude: 28.6667, longitude: 77.2167, area: 'Central Delhi' },
  { id: '3', stopName: 'Red Fort', latitude: 28.6562, longitude: 77.2410, area: 'Old Delhi' },
  { id: '4', stopName: 'Chandni Chowk', latitude: 28.6506, longitude: 77.2303, area: 'Old Delhi' },
  { id: '5', stopName: 'Connaught Place', latitude: 28.6315, longitude: 77.2167, area: 'Central Delhi' },
  { id: '6', stopName: 'India Gate', latitude: 28.6129, longitude: 77.2295, area: 'Central Delhi' },
  { id: '7', stopName: 'ITO', latitude: 28.6281, longitude: 77.2426, area: 'Central Delhi' },
  { id: '8', stopName: 'Pragati Maidan', latitude: 28.6208, longitude: 77.2428, area: 'Central Delhi' },
  { id: '9', stopName: 'Lajpat Nagar', latitude: 28.5677, longitude: 77.2431, area: 'South Delhi' },
  { id: '10', stopName: 'Nehru Place', latitude: 28.5494, longitude: 77.2501, area: 'South Delhi' },
  { id: '11', stopName: 'Saket', latitude: 28.5244, longitude: 77.2066, area: 'South Delhi' },
  { id: '12', stopName: 'Hauz Khas', latitude: 28.5494, longitude: 77.2001, area: 'South Delhi' },
  { id: '13', stopName: 'Dhaula Kuan', latitude: 28.5930, longitude: 77.1546, area: 'West Delhi' },
  { id: '14', stopName: 'Rajouri Garden', latitude: 28.6410, longitude: 77.1217, area: 'West Delhi' },
  { id: '15', stopName: 'Rohini', latitude: 28.7435, longitude: 77.0689, area: 'North Delhi' },
];

export const mockBusRoutes: BusRoute[] = [
  {
    id: 'route-1',
    routeNumber: '445',
    routeName: 'Kashmere Gate - Nehru Place',
    source: 'Kashmere Gate',
    destination: 'Nehru Place',
    distanceKm: 18.5,
    estimatedDuration: 55,
    busType: 'Non-AC',
    farePerKm: 1.5,
    isActive: true,
  },
  {
    id: 'route-2',
    routeNumber: '181',
    routeName: 'ISBT - Saket',
    source: 'ISBT',
    destination: 'Saket',
    distanceKm: 22.3,
    estimatedDuration: 65,
    busType: 'AC',
    farePerKm: 2.0,
    isActive: true,
  },
  {
    id: 'route-3',
    routeNumber: '764',
    routeName: 'Connaught Place - Rohini',
    source: 'Connaught Place',
    destination: 'Rohini',
    distanceKm: 25.7,
    estimatedDuration: 75,
    busType: 'Electric',
    farePerKm: 1.8,
    isActive: true,
  },
  {
    id: 'route-4',
    routeNumber: '534',
    routeName: 'Red Fort - Rajouri Garden',
    source: 'Red Fort',
    destination: 'Rajouri Garden',
    distanceKm: 16.2,
    estimatedDuration: 50,
    busType: 'Non-AC',
    farePerKm: 1.5,
    isActive: true,
  },
  {
    id: 'route-5',
    routeNumber: '620',
    routeName: 'India Gate - Dhaula Kuan',
    source: 'India Gate',
    destination: 'Dhaula Kuan',
    distanceKm: 10.8,
    estimatedDuration: 35,
    busType: 'AC',
    farePerKm: 2.0,
    isActive: true,
  },
];

export const mockRouteStops: RouteStop[] = [
  { id: 'rs-1', routeId: 'route-1', stopId: '1', stopSequence: 1, distanceFromStart: 0 },
  { id: 'rs-2', routeId: 'route-1', stopId: '3', stopSequence: 2, distanceFromStart: 2.1 },
  { id: 'rs-3', routeId: 'route-1', stopId: '5', stopSequence: 3, distanceFromStart: 5.5 },
  { id: 'rs-4', routeId: 'route-1', stopId: '7', stopSequence: 4, distanceFromStart: 7.8 },
  { id: 'rs-5', routeId: 'route-1', stopId: '9', stopSequence: 5, distanceFromStart: 14.2 },
  { id: 'rs-6', routeId: 'route-1', stopId: '10', stopSequence: 6, distanceFromStart: 18.5 },
];

export const mockBuses: Bus[] = [
  {
    id: 'bus-1',
    busNumber: 'DL-1PC-7845',
    routeId: 'route-1',
    capacity: 50,
    busType: 'Non-AC',
    currentLatitude: 28.6315,
    currentLongitude: 77.2167,
    isActive: true,
    lastUpdated: new Date(),
  },
  {
    id: 'bus-2',
    busNumber: 'DL-1PC-8932',
    routeId: 'route-1',
    capacity: 50,
    busType: 'Non-AC',
    currentLatitude: 28.5677,
    currentLongitude: 77.2431,
    isActive: true,
    lastUpdated: new Date(),
  },
  {
    id: 'bus-3',
    busNumber: 'DL-1PC-5621',
    routeId: 'route-2',
    capacity: 45,
    busType: 'AC',
    currentLatitude: 28.6410,
    currentLongitude: 77.1217,
    isActive: true,
    lastUpdated: new Date(),
  },
  {
    id: 'bus-4',
    busNumber: 'DL-1PC-3478',
    routeId: 'route-3',
    capacity: 40,
    busType: 'Electric',
    currentLatitude: 28.7000,
    currentLongitude: 77.1000,
    isActive: true,
    lastUpdated: new Date(),
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'New Route Launched',
    message: 'Route 764 (Connaught Place - Rohini) is now operational with electric buses.',
    priority: 'high',
    createdBy: 'admin-001',
    createdAt: new Date(Date.now() - 86400000),
    isActive: true,
  },
  {
    id: 'ann-2',
    title: 'Service Update',
    message: 'Due to maintenance work, Route 445 will have reduced frequency between 2 PM - 4 PM.',
    priority: 'medium',
    createdBy: 'admin-001',
    createdAt: new Date(Date.now() - 3600000),
    isActive: true,
  },
  {
    id: 'ann-3',
    title: 'Free Pass Registration',
    message: 'Female passengers can now register for free monthly passes online.',
    priority: 'high',
    createdBy: 'admin-001',
    createdAt: new Date(Date.now() - 172800000),
    isActive: true,
  },
];

export function getStopById(id: string): BusStop | undefined {
  return mockBusStops.find(stop => stop.id === id);
}

export function getRouteById(id: string): BusRoute | undefined {
  return mockBusRoutes.find(route => route.id === id);
}

export function getRouteStops(routeId: string): RouteStop[] {
  return mockRouteStops.filter(rs => rs.routeId === routeId);
}

export function getBusesByRoute(routeId: string): Bus[] {
  return mockBuses.filter(bus => bus.routeId === routeId);
}

export function searchRoutes(source: string, destination: string): BusRoute[] {
  const query = (text: string) => text.toLowerCase().trim();
  const src = query(source);
  const dest = query(destination);

  return mockBusRoutes.filter(route =>
    query(route.source).includes(src) && query(route.destination).includes(dest) ||
    query(route.routeName).includes(src) || query(route.routeName).includes(dest)
  );
}
