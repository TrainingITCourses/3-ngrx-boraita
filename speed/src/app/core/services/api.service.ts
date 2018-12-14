import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { GlobalStore } from '../store/global/global-store.state';
import {
  LoadStatuses,
  LoadAgencies,
  LoadTypes
} from '../store/global/global-store.actions';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private global: GlobalStore) {}
  getAgencies() {
    return this.http
      .get('../assets/data/agencies.json')
      .pipe(map(data => data['agencies']))
      .subscribe(agencies => this.global.dispatch(new LoadAgencies(agencies)));
  }
  getStatues() {
    this.http
      .get('../assets/data/launchstatus.json')
      .pipe(map(data => data['types']))
      .subscribe(statues => this.global.dispatch(new LoadStatuses(statues)));
  }
  getTypes() {
    return this.http
      .get('../assets/data/missiontypes.json')
      .pipe(map(data => data['types']))
      .subscribe(types => {
        this.global.dispatch(new LoadTypes(types));
      });
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
