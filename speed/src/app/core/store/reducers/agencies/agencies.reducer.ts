import { AgenciesActions, AgenciesActionTypes } from './agencies.actions';

export interface AgenciesState {
  agencies;
  loading: boolean;
}

export const initialState: AgenciesState = {
  agencies: [],
  loading: false
};

export function reducer(state = initialState, action: AgenciesActions): AgenciesState {
  switch (action.type) {
    case AgenciesActionTypes.LoadAgencies:
      return { ...state, loading: true };
      break;
    case AgenciesActionTypes.AgenciesLoaded:
      return { loading: false, agencies: action.payload };
      break;
    default:
      return state;
  }
}
