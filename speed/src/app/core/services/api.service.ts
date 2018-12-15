import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  getAgencies() {
    return this.http
      .get('../assets/data/agencies.json')
      .pipe(map(data => data['agencies']));
  }
  getStatues() {
    return this.http
      .get('../assets/data/launchstatus.json')
      .pipe(map(data => data['types']));
  }
  getTypes() {
    return this.http
      .get('../assets/data/missiontypes.json')
      .pipe(map(data => data['types']));
  }
  getAllLaunches = key => {
    const localLaunches = localStorage.getItem(key);
    if (localLaunches) {
      return of(JSON.parse(localLaunches));
    } else {
      return this.http.get('../assets/data/launches.json').pipe(
        map(data => data[key]),
        tap(launches => {
          localStorage.setItem(key, JSON.stringify(launches));
        })
      );
    }
  };
}
