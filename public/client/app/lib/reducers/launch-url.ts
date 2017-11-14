import * as launchURL from '../actions/launch-url';

import { HttpParams } from '@angular/common/http';

export class LaunchURLState {
  location: Location;
  search: URLSearchParams;
}

export const initialState: LaunchURLState = {
  location: <Location>{},
  search: new HttpParams()
};

export function reducer(state = initialState,
                        action: launchURL.Actions): LaunchURLState {
  switch (action.type) {

    case launchURL.ActionTypes.LOAD:
      return Object.assign({}, initialState, action.payload);

    default:
      return state;

  }
}
