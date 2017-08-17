import {Injectable} from '@angular/core';

/**
 * Exposes the server-side environment variables as prepared by the
 * build and deploy process as a standard Angular service.
 */

declare var ENV: any;

@Injectable()
export class EnvService {

  /** ctor */
  constructor() {
    Object.keys(ENV).forEach(k => this[k] = ENV[k]);
  }

}
