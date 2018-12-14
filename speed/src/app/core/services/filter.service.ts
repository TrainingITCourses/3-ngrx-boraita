import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Launch } from '../../store/models/launch';
import {
  GlobalStore,
  GlobalSlideTypes
} from '../store/global/global-store.state';
import { map } from 'rxjs/operators';
import { State } from '../store/reducers/launchers/launches.reducer';
import { LauncherEffects } from '../store/reducers/launchers/launcher.effects';

@Injectable()
export class FilterService {
  constructor(
    private global: GlobalStore,
    private store: Store<State>,
    private launchesEffect: LauncherEffects
  ) {}
  getFilterAgencies(type) {
    return this.store.select('launches').pipe(
      map(st => st.launches),
      map(launches => {
       return launches.filter(launch => {
          if (launch.missions.length > 0 && launch.missions[0].agencies) {
            return launch.missions.find(
              mission =>
                mission.agencies &&
                mission.agencies.find(agency => agency.type === type) !==
                  undefined
            );
          }
        });
      })
    );
  }

  getFilterMissions(missionId) {
    return this.store
      .select('launches')
      .pipe(
        map(launches =>
          launches.launches.filter(
            (launch: Launch) => launch.status === missionId
          )
        )
      );
  }

  getFilterLaunchers(launchId) {
    return this.store
      .select('launches')
      .pipe(
        map(launches =>
          launches.launches.filter((launch: Launch) =>
            launch.missions.find(mission => mission.type === launchId)
          )
        )
      );
  }
}
