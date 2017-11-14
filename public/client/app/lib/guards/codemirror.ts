import { CanActivate, CanActivateChild } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

import { AsyncLoader } from '../utils/async-loader';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';

/**
 * Loads CodeMirror scripts and styles.
 */

@Injectable()
export class CodeMirrorGuard implements CanActivate, CanActivateChild {

  canActivate(): Observable<boolean> {
    return this._canActivate();
  }

  canActivateChild(): Observable<boolean> {
    return this._canActivate();
  }

  // private methods

  private _canActivate(): Observable<boolean> {
    const base = '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.31.0';
    const loader = Promise.all([
      AsyncLoader.css(`${base}/codemirror.min.css`),
      AsyncLoader.css(`${base}/addon/lint/lint.min.css`),
      AsyncLoader.css(`${base}/theme/midnight.min.css`),
      AsyncLoader.js(`${base}/codemirror.min.js`),
      AsyncLoader.js(`${base}/mode/javascript/javascript.min.js`),
      AsyncLoader.js(`//cdnjs.cloudflare.com/ajax/libs/jsonlint/1.6.0/jsonlint.min.js`),
      AsyncLoader.js(`${base}/addon/lint/lint.min.js`),
      AsyncLoader.js(`${base}/addon/lint/json-lint.min.js`),
    ]);
    return from(loader).pipe(
      catchError((x: any) => of(false)),
      map((x: any) => true)
    );
  }

}
