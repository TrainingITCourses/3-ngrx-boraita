import { Action } from '@ngrx/store';
import { StatesActions, StatesActionTypes } from './states.actions';

export interface StatesState {
  states;
  loading: boolean;
}

export const initialState: StatesState = {
  states: [],
  loading: false
};

export function reducer(
  state = initialState,
  action: StatesActions
): StatesState {
  switch (action.type) {
    case StatesActionTypes.LoadStates:
      return { ...state, loading: true };
      break;
    case StatesActionTypes.statesLoaded:
      return { states: action.payload, loading: false };
      break;
    default:
      return state;
  }
}
