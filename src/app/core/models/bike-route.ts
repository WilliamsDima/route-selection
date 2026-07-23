export type BikeRouteType = 'short' | 'long' | 'big';

export interface BikeRoute {
  id: number;
  name: string;
  gpxFile: string;
  distKm: number;
  type: BikeRouteType;
}
