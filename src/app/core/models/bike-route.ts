export type BikeRouteType = 'short' | 'long' | 'big';

export interface BikeRoute {
  id: number;
  name: string;
  gpxFile: string;
  distKm: number;
  type: BikeRouteType;
}

export const BIKE_ROUTE_TYPE_LABELS: Record<BikeRouteType, string> = {
  short: 'Короткий',
  long: 'Длинный',
  big: 'Большой',
};

export const BIKE_ROUTE_TYPE_FILTER_LABELS: Record<BikeRouteType, string> = {
  short: 'Короткие',
  long: 'Длинные',
  big: 'Большие',
};
