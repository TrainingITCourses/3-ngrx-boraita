import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import {
  LaunchesActionTypes,
  LoadLaunches,
  LoadLaunched
} from './launches.actions';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class LauncherEffects {
  @Effect() LaunchesEffect$ = this.actions$
    .ofType(LaunchesActionTypes.LoadLaunches)
    .pipe(
      mergeMap((action: LoadLaunches) =>
        this.api
          .getAllLaunches(action.key)
          .pipe(map(launches => new LoadLaunched(launches)))
      )
    );

  constructor(private actions$: Actions, private api: ApiService) {}
}
