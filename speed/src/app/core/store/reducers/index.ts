import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromLaunches from './launchers/launches.reducer';
import * as fromAgencies from './agencies/agencies.reducer';
import { environment } from 'src/environments/environment.prod';
import * as fromStates from './states/states.reducer';
import * as fromTypes from './types/types.reducer';

export interface State {
  launches: fromLaunches.LauncherState;
  agencies: fromAgencies.AgenciesState;
  states: fromStates.StatesState;
  types: fromTypes.TypesState;
}

export const reducers: ActionReducerMap<State> = {
  launches: fromLaunches.reducer,
  agencies: fromAgencies.reducer,
  states: fromStates.reducer,
  types: fromTypes.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
