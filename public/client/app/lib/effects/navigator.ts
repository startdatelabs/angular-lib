import * as navigator from '../actions/navigator';

import { Actions, Effect } from '@ngrx/effects';
import { map, startWith, tap, withLatestFrom } from 'rxjs/operators';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { NavigatorState } from '../reducers/navigator';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

/**
 * Side-effects for navigator actions
 */

@Injectable()
export class NavigatorEffects {

  /**
   * Listen for toggle action to record last-used navigator state
   */

  @Effect() expando: Observable<Action> = this.actions
    .ofType(navigator.ActionTypes.EXPANDO).pipe(
       withLatestFrom(this.store.select('navigator'), (action, state) => state),
       tap((state: NavigatorState) => this.lstor.set(navigator.ActionTypes.EXPANDO, state.expando)),
       map((state: NavigatorState) => navigator.noop())
    );

  /**
   * Listen for toggle action to record last-used navigator state
   */

  @Effect() menu: Observable<Action> = this.actions
    .ofType(navigator.ActionTypes.MENU).pipe(
      withLatestFrom(this.store.select('navigator'), (action, state) => state),
      tap((state: NavigatorState) => {
        if (state.stickyMenu)
          this.lstor.set(navigator.ActionTypes.MENU, state.menu);
      }),
      map((state: NavigatorState) => navigator.noop())
    );

  /**
   * Listen for an init action to load last-used navigator state
   */

  @Effect() init: Observable<Action> = this.actions
    .ofType(navigator.ActionTypes.INIT).pipe(
      startWith(navigator.init()),
      map((action: Action) => {
        const expando = this.lstor.get(navigator.ActionTypes.EXPANDO) || <any>{};
        const menu = <number>this.lstor.get(navigator.ActionTypes.MENU) || 0;
        return navigator.load({expando, menu});
      })
    );

  // we should strongly-type the Store, but we can't because it belongs
  // to someone else and we're in a common library
  constructor(private actions: Actions,
              private lstor: LocalStorageService,
              private store: Store<any>) { }

}
