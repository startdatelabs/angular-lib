import { HttpParams } from '@angular/common/http';
import { LibQueryEncoder } from './query-encoder';

/**
 * Super duper HttpParams
*/

export class LibHttpParams extends HttpParams {

  // private methods
  private static isEmpty(value: any) {
    // see https://stackoverflow.com/questions/2647867/
    // how-to-determine-if-variable-is-undefined-or-null
    return (value == null) || (value === '');
  }

  /** ctor */
  constructor(public options: any) {
    super(options);
  }

  /** Override set */
  set(param: string,
      value: string): HttpParams {
    if (LibHttpParams.isEmpty(value))
      return this;
    else {
      const params = super.set(param, value);
      return new LibHttpParams({encoder: new LibQueryEncoder(), fromString: params.toString()});
    }
  }

}
