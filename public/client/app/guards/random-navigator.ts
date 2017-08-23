import 'rxjs/add/observable/of';

import { CanNavigate } from '../lib/components/navigator';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * Just a random test guard
 */

@Injectable()
export class RandomNavigatorGuard implements CanNavigate {

  canNavigate(): Observable<boolean> {
    return Observable.of(Math.random() > 0.5);
  }

}
