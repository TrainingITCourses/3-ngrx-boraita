import { Action } from '@ngrx/store';

export enum StatesActionTypes {
  LoadStates = '[States] Load States',
  statesLoaded = '[States] Loaded States'
}

export class LoadStates implements Action {
  readonly type = StatesActionTypes.LoadStates;
}
export class StatesLoaded implements Action {
  readonly type = StatesActionTypes.statesLoaded;
  constructor(public readonly payload: any[]) {}
}

export type StatesActions = LoadStates | StatesLoaded;
