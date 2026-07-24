export type TrackPoint = [number, number];

export function parseGpx(xml: string): TrackPoint[] {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  const points = doc.querySelectorAll('trkpt');

  return Array.from(points).map((point) => {
    const lat = Number(point.getAttribute('lat'));
    const lon = Number(point.getAttribute('lon'));
    return [lat, lon] as TrackPoint;
  });
}
