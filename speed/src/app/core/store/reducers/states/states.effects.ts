import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { StatesActionTypes, LoadStates, StatesLoaded } from './states.actions';
import { ApiService } from 'src/app/core/services/api.service';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class StatesEffects {
  @Effect() StatesEffects$ = this.actions$
    .ofType(StatesActionTypes.LoadStates)
    .pipe(
      mergeMap((action: LoadStates) =>
        this.api.getStatues().pipe(map(states => new StatesLoaded(states)))
      )
    );

  constructor(private actions$: Actions, private api: ApiService) {}
}
