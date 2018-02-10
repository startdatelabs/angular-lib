import { CanActivate, CanActivateChild } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

import { AsyncLoader } from '../utils/async-loader';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';

/**
 * Loads Font Awesome 5 (Web Fonts with CSS version)
 */

@Injectable()
export class FontAwesomeCSSGuard implements CanActivate, CanActivateChild {

  canActivate(): Observable<boolean> {
    return this._canActivate();
  }

  canActivateChild(): Observable<boolean> {
    return this._canActivate();
  }

  // private methods

  private _canActivate(): Observable<boolean> {
    const script = 'https://use.fontawesome.com/releases/v5.0.6/css/all.css';
    return from(AsyncLoader.css(script)).pipe(
      catchError((x: any) => of(false)),
      map((x: any) => true)
    );
  }

}
