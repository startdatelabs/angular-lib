import { CanNavigate } from '../lib/components/navigator';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

/**
 * Just a random test guard
 */

@Injectable()
export class RandomNavigatorGuard implements CanNavigate {

  canNavigate(): Observable<boolean> {
    return of(Math.random() > 0.5);
  }

}
