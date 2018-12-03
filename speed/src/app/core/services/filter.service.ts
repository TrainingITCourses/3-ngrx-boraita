import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Launch } from '../../store/models/launch';
import {
  GlobalStore,
  GlobalSlideTypes
} from '../store/global/global-store.state';
import { LoadLaunches } from '../store/global/global-store.actions';

@Injectable()
export class FilterService {
  constructor(private global: GlobalStore) {}
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
    this.global.dispatch(new LoadLaunches(filteredLaunches));
  }

  getFilterMissions(missionId) {
    const launches = this.global.selectSnapShot(GlobalSlideTypes.launches);
    const filteredLaunches = launches.filter(
      (launch: Launch) => launch.status === missionId
    );
    this.global.dispatch(new LoadLaunches(filteredLaunches));
  }

  getFilterLaunchers(launchId) {
    const launches = this.global.selectSnapShot(GlobalSlideTypes.launches);
    const filteredLaunches = launches.filter((launch: Launch) =>
      launch.missions.find(mission => mission.type === launchId)
    );
    this.global.dispatch(new LoadLaunches(filteredLaunches));
  }
}
