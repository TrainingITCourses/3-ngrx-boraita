import { TypesActions, TypesActionTypes } from './types.actions';

export interface TypesState {
  types;
  loading: boolean;
}

export const initialState: TypesState = {
  types: [],
  loading: false
};

export function reducer(
  state = initialState,
  action: TypesActions
): TypesState {
  switch (action.type) {
    case TypesActionTypes.LoadTypes:
      return { ...state, loading: true };
      break;
    case TypesActionTypes.TypesLoaded:
      return { loading: false, types: action.payload };
      break;
    default:
      return state;
  }
}
