import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GlobalStore } from '../store/global/global-store.state';
import {
  LoadLaunches,
  LoadStatuses,
  LoadAgencies,
  LoadTypes
} from '../store/global/global-store.actions';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private global: GlobalStore) {}
  key = 'launches';
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
  getAllLaunches() {
    const localLaunches = localStorage.getItem(this.key);
    if (localLaunches) {
      this.global.dispatch(new LoadLaunches(JSON.parse(localLaunches)));
    } else {
      this.http
        .get('../assets/data/launches.json')
        .pipe(map(data => data[this.key]))
        .subscribe(
          launches => (
            localStorage.setItem(this.key, JSON.stringify(launches)),
            this.global.dispatch(new LoadLaunches(launches))
          )
        );
    }
  }
}
