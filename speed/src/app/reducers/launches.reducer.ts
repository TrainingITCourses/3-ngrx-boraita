import { LaunchesActionTypes, LaunchesActions } from './launches.actions';

export interface State {
  launches;
  loading: boolean;
}

export const initialState: State = {
  launches: [],
  loading: false
};

export function reducer(state = initialState, action: LaunchesActions): State {
  switch (action.type) {
    case LaunchesActionTypes.LoadLaunches:
      return { ...state, loading: true };
      break;
    case LaunchesActionTypes.LoadLaunched:
      return { loading: false, launches: action.payload };
      break;
    default:
      return state;
  }
}
