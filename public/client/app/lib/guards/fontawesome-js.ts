import { AsyncLoader } from '../utils/async-loader';
import { CanActivate } from '@angular/router';
import { CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

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
    const script = 'https://use.fontawesome.com/releases/v5.1.0/js/all.js';
    return from(AsyncLoader.js(script)).pipe(
      catchError((x: any) => of(false)),
      map((x: any) => true)
    );
  }

}
