import * as launchURL from '../actions/launch-url';

import { Actions, Effect } from '@ngrx/effects';
import { LaunchURLState, initialState } from '../reducers/launch-url';
import { map, startWith } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { parseInitialSearchParams } from '../utils';

/**
 * Side-effects for launch URL actions
 */

@Injectable()
export class LaunchURLEffects {

  /**
   * Listen for an init action to load last-used user state
   */

  @Effect() init: Observable<Action> = this.actions
    .ofType(launchURL.ActionTypes.INIT).pipe(
      startWith(launchURL.init()),
      map((action: Action) => {
        const state: LaunchURLState = Object.assign({}, initialState);
        state.location = location;
        state.search = parseInitialSearchParams();
        return launchURL.load(state);
      })
    );

  constructor(private actions: Actions) { }

}
