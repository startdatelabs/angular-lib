import { Actions, Effect } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Log all actions
 */

@Injectable()
export class LogEffects {

  /**
   * Simply log all actions
   */

  @Effect({dispatch: false}) logActions: Observable<Action> = this.actions.pipe(
    tap(((action: any) => console.log(`%c ${action.type}`, 'color: green', action.payload))));

  /** ctor */
  constructor(private actions: Actions) { }

}
