import { Action } from '@ngrx/store';

export enum AgenciesActionTypes {
  LoadAgencies = '[Agencies] Load Agencies',
  AgenciesLoaded = '[Agencies] Loaded Agencies'
}

export class LoadAgencies implements Action {
  readonly type = AgenciesActionTypes.LoadAgencies;
}
export class AgenciesLoaded implements Action {
  readonly type = AgenciesActionTypes.AgenciesLoaded;
  constructor(public readonly payload: any[]) {}
}

export type AgenciesActions = LoadAgencies | AgenciesLoaded;
