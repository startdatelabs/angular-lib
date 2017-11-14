import { CanActivate, CanActivateChild } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

import { AsyncLoader } from '../utils/async-loader';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';

/**
 * Loads highlight.js scripts and styles.
 */

@Injectable()
export class HighlightJSGuard implements CanActivate, CanActivateChild {

  canActivate(): Observable<boolean> {
    return this._canActivate();
  }

  canActivateChild(): Observable<boolean> {
    return this._canActivate();
  }

  // private methods

  private _canActivate(): Observable<boolean> {
    const base = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0';
    const loader = Promise.all([
      AsyncLoader.css(`${base}/styles/default.min.css`),
      AsyncLoader.js(`${base}/highlight.min.js`)
    ]);
    return from(loader).pipe(
      catchError((x: any) => of(false)),
      map((x: any) => true)
    );
  }

}
