import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatAll, first } from 'rxjs/operators';

export type HotspotLocation = {
  bbl: string,
  city: string,
  location: string,
  y: string,
  lat: string,
  type: string,
  borocd: string,
  provider: string,
  lon: string,
  name?: string,
  borocode: string,
  ntacode: string,
  remarks: string,
  location_t: string,
  ct2010: string,
  boro: string,
  sourceid: string,
  activated: string,
  boroct2010: string,
  postcode: string,
  ntaname: string,
  the_geom: {
    coordinates: [
      number,
      number
    ],
    type: string
  },
  x: string,
  bin: string,
  objectid: string,
  doitt_id: string,
  boroname: string,
  coundist: string,
  ssid: string,
}

@Injectable({
  providedIn: 'root'
})
export class HotspotService {

  constructor(private http: HttpClient) { }

  getHotspots() {
    return this.http.get<HotspotLocation[]>("https://data.cityofnewyork.us/resource/varh-9tsp.json")
  }

  getHotspot(id: string): Observable<HotspotLocation> {
    return this.http.get<HotspotLocation[]>("https://data.cityofnewyork.us/resource/varh-9tsp.json", {
      params: {
        objectid: id
      }
    }).pipe(
      concatAll(),
      first(),
    );
  }
}
