import { LaunchesActionTypes, LaunchesActions } from './launches.actions';

export interface LauncherState {
  launches;
  loading: boolean;
}

export const initialState: LauncherState = {
  launches: [],
  loading: false
};

export function reducer(state = initialState, action: LaunchesActions): LauncherState {
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
