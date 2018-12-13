import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  LaunchesActionTypes,
  LoadLaunches,
  LoadLaunched
} from './launches.actions';
import { mergeMap, map } from 'rxjs/operators';
import { ApiService } from '../core/services/api.service';
import { HttpClient } from '@angular/common/http';

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
