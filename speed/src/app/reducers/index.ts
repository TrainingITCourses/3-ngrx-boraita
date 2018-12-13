import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromLaunches from './launches.reducer';

export interface State {

  launches: fromLaunches.State;
}

export const reducers: ActionReducerMap<State> = {

  launches: fromLaunches.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
