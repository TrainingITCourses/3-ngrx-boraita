import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import { TypesActionTypes, LoadTypes, TypesLoaded } from './types.actions';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable()
export class TypesEffects {
  @Effect() TypesEffects$ = this.actions$
    .ofType(TypesActionTypes.LoadTypes)
    .pipe(
      mergeMap((action: LoadTypes) =>
        this.api.getTypes().pipe(map(types => new TypesLoaded(types)))
      )
    );

  constructor(private actions$: Actions, private api: ApiService) {}
}
