import { HttpParameterCodec } from '@angular/common/http';

/**
 * Custom HttpParameterCodec needed because Ratpack has different assumptions than Angular2
 *
 * See https://angular.io/docs/ts/latest/api/http/index/URLSearchParams-class.html
*/

export class LibQueryEncoder implements HttpParameterCodec {

  decodeKey(k: string): string {
    return decodeURIComponent(k);
  }

  decodeValue(v: string): string {
    return decodeURIComponent(v);
  }

  encodeKey(k: string): string {
    return encodeURIComponent(k);
  }

  encodeValue(v: string): string {
    return encodeURIComponent(v);
  }

}
