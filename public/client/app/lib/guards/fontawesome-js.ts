import { CanActivate, CanActivateChild } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

import { AsyncLoader } from '../utils/async-loader';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';

/**
 * Loads Font Awesome 5 (SVG with JS version)
 */

@Injectable()
export class FontAwesomeJSGuard implements CanActivate, CanActivateChild {

  canActivate(): Observable<boolean> {
    return this._canActivate();
  }

  canActivateChild(): Observable<boolean> {
    return this._canActivate();
  }

  // private methods

  private _canActivate(): Observable<boolean> {
    const script = 'https://use.fontawesome.com/releases/v5.0.6/js/all.js';
    return from(AsyncLoader.js(script)).pipe(
      catchError((x: any) => of(false)),
      map((x: any) => true)
    );
  }

}
