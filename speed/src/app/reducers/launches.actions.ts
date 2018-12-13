import { Action } from '@ngrx/store';

export enum LaunchesActionTypes {
  LoadLaunches = '[Launches] Load Launchess',
  LoadLaunched = '[Launches] Load Launched'
}

export class LoadLaunches implements Action {
  readonly type = LaunchesActionTypes.LoadLaunches;
  readonly key = 'launches';
  constructor() {}
}
export class LoadLaunched implements Action {
  readonly type = LaunchesActionTypes.LoadLaunched;
  readonly key = 'launches';
  constructor(public readonly payload: any[]) {}
}

export type LaunchesActions = LoadLaunches | LoadLaunched;
