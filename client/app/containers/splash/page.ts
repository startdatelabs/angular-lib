import { Component } from '@angular/core';
import { flyInOut } from '../../lib/animations';

/**
 * Empty page
 */

@Component({
  animations: [flyInOut()],
  selector: 'lib-splash-page',
  styleUrls: ['page.less'],
  templateUrl: 'page.html'
})

export class SplashPageComponent { }
