import { BikeRoute } from '../../../core/models/bike-route';
import { WheelSegment } from './wheel-segment.model';

const CENTER = 50;
const RADIUS = 46;
const LABEL_RADIUS = 30;
const FULL_SPINS = 5;

export const ACTIVE_SCALE = 1.08;
export const MIN_SPIN_DURATION_MS = 5000;
export const MAX_SPIN_DURATION_MS = 60000;
export const DEFAULT_SPIN_DURATION_MS = MIN_SPIN_DURATION_MS;

function polar(radius: number, angleDeg: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.sin(rad),
    y: CENTER - radius * Math.cos(rad),
  };
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}

function contrastText(hue: number): string {
  const toLinear = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const [r, g, b] = hslToRgb(hue, 65, 55);
  const luminance = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  return luminance > 0.4 ? '#1a1d23' : '#ffffff';
}

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export function labelFontSize(count: number): number {
  if (count <= 8) return 3.8;
  if (count <= 14) return 3.2;
  return 2.7;
}

export function buildSegments(routes: BikeRoute[]): WheelSegment[] {
  const n = routes.length;
  if (n === 0) return [];

  const seg = 360 / n;
  const maxChars = n <= 8 ? 16 : n <= 14 ? 13 : 10;

  return routes.map((route, i) => {
    const a1 = i * seg;
    const a2 = (i + 1) * seg;
    const mid = a1 + seg / 2;

    const p1 = polar(RADIUS, a1);
    const p2 = polar(RADIUS, a2);
    const largeArc = seg > 180 ? 1 : 0;

    const path =
      n === 1
        ? `M ${CENTER - RADIUS} ${CENTER} A ${RADIUS} ${RADIUS} 0 1 1 ${CENTER + RADIUS} ${CENTER} A ${RADIUS} ${RADIUS} 0 1 1 ${CENTER - RADIUS} ${CENTER} Z`
        : `M ${CENTER} ${CENTER} L ${p1.x} ${p1.y} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${p2.x} ${p2.y} Z`;

    const hue = Math.round((i * 360) / n);
    const label = polar(LABEL_RADIUS, mid);

    return {
      index: i,
      path,
      color: `hsl(${hue} 65% 55%)`,
      textColor: contrastText(hue),
      label: truncate(route.name, maxChars),
      labelX: label.x,
      labelY: label.y,
      labelRotation: mid <= 180 ? mid - 90 : mid + 90,
    };
  });
}

export function indexUnderPointer(rotation: number, count: number): number {
  if (count === 0) return -1;
  const seg = 360 / count;
  const local = ((-rotation % 360) + 360) % 360;
  return Math.floor(local / seg) % count;
}

export function computeSpinTarget(from: number, winner: number, count: number): number {
  const seg = 360 / count;
  const winnerMid = winner * seg + seg / 2;
  const targetMod = (360 - (winnerMid % 360)) % 360;
  const delta = ((targetMod - (from % 360)) + 360) % 360;
  return from + FULL_SPINS * 360 + delta;
}
