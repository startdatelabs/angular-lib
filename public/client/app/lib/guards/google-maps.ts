import { CanActivate, CanActivateChild } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

import { AsyncLoader } from '../utils/async-loader';
import { EnvService } from '../services/env';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';

/**
 * Loads Google maps script.
 */

@Injectable()
export class GoogleMapsGuard implements CanActivate, CanActivateChild {

  /** ctor */
  constructor(private env: EnvService) { }

  canActivate(): Observable<boolean> {
    return this._canActivate();
  }

  canActivateChild(): Observable<boolean> {
    return this._canActivate();
  }

  // private methods

  private _canActivate(): Observable<boolean> {
    const script = `https://maps.googleapis.com/maps/api/js?key=${this.env['GOOGLE_MAPS_API_KEY']}`;
    return from(AsyncLoader.js(script)).pipe(
      catchError((x: any) => of(false)),
      map((x: any) => true)
    );
  }

}
