import { CanNavigate } from '../lib/components/navigator';
import { Injectable } from '@angular/core';

/**
 * Just a random test guard
 */

@Injectable()
export class RandomNavigatorGuard implements CanNavigate {

  canNavigate(): boolean {
    return Math.random() > 0.5;
  }

}
