import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import { ApiService } from 'src/app/core/services/api.service';
import { AgenciesActionTypes, AgenciesLoaded, LoadAgencies } from './agencies.actions';

@Injectable()
export class AgenciesEffects {
  @Effect() AgenciesEffect$ = this.actions$
    .ofType(AgenciesActionTypes.LoadAgencies)
    .pipe(
      mergeMap((action: LoadAgencies) =>
        this.api
          .getAgencies()
          .pipe(map(agencies => new AgenciesLoaded(agencies)))
      )
    );

  constructor(private actions$: Actions, private api: ApiService) {}
}
