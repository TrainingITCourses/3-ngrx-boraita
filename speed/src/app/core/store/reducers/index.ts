import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromLaunches from './launchers/launches.reducer';
import { environment } from 'src/environments/environment.prod';

export interface State {

  launches: fromLaunches.State;
}

export const reducers: ActionReducerMap<State> = {

  launches: fromLaunches.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
