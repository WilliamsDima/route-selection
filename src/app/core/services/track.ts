import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { ApiService } from './api';
import { parseGpx, TrackPoint } from './gpx-parser';

@Injectable({ providedIn: 'root' })
export class TrackService {
  private readonly api = inject(ApiService);
  private readonly cache = new Map<string, Observable<TrackPoint[]>>();

  getTrack(gpxFile: string): Observable<TrackPoint[]> {
    let track$ = this.cache.get(gpxFile);

    if (!track$) {
      track$ = this.api.getText(gpxFile).pipe(map(parseGpx), shareReplay(1));
      this.cache.set(gpxFile, track$);
    }

    return track$;
  }
}
