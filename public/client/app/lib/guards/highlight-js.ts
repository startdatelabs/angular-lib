import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { catchError, flatMap, map } from 'rxjs/operators';

import { AsyncLoader } from '../utils/async-loader';
import { Injectable } from '@angular/core';

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
    return from(AsyncLoader.css(`${base}/styles/default.min.css`)).pipe(
      flatMap(() => from(AsyncLoader.js(`${base}/highlight.min.js`))),
      catchError((x: any) => of(false)),
      map((x: any) => true)
    );
  }

}
