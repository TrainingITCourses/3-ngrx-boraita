import { Action } from '@ngrx/store';

export enum TypesActionTypes {
  LoadTypes = '[Types] Load Types',
  TypesLoaded = '[Types] Loaded Types'
}

export class LoadTypes implements Action {
  readonly type = TypesActionTypes.LoadTypes;
}
export class TypesLoaded implements Action {
  readonly type = TypesActionTypes.TypesLoaded;
  constructor(public readonly payload: any[]) {}
}

export type TypesActions = LoadTypes | TypesLoaded;
