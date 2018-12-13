import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Launch } from '../../store/models/launch';
import {
  GlobalStore,
  GlobalSlideTypes
} from '../store/global/global-store.state';
import { LoadLaunches, LoadLaunched } from '../../reducers/launches.actions';
import { State } from '../../reducers/launches.reducer';
import { LauncherEffects } from 'src/app/reducers/launcher.effects';

@Injectable()
export class FilterService {
  constructor(
    private global: GlobalStore,
    private store: Store<State>,
    private launchesEffect: LauncherEffects
  ) {}
  getFilterAgencies(type) {
    const launches = this.global.selectSnapShot(GlobalSlideTypes.launches);
    const filteredLaunches = launches.filter((launch: Launch) => {
      if (launch.missions.length > 0 && launch.missions[0].agencies) {
        return launch.missions.find(
          mission =>
            mission.agencies &&
            mission.agencies.find(agency => agency.type === type) !== undefined
        );
      }
    });
    this.store.dispatch(new LoadLaunched(filteredLaunches));
  }

  getFilterMissions(missionId) {
    this.launchesEffect.LaunchesEffect$.subscribe(launches => {
      debugger;
      const filteredLaunches = launches['payload'].filter(
        (launch: Launch) => launch.status === missionId
      );
      this.store.dispatch(new LoadLaunched(filteredLaunches));
    });
  }

  getFilterLaunchers(launchId) {
    this.store.select('launches').subscribe(launchesReturned => {
      debugger;
      const filteredLaunches = launchesReturned.filter((launch: Launch) =>
        launch.missions.find(mission => mission.type === launchId)
      );
      this.store.dispatch(filteredLaunches);
    });
  }
}
