import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';


/**
 * Converts arrays and objects into JSON-like strings, usually for diagnostic
 * purposes but sometimes when no other mecahanism is available.
 *
 * NOTE: quotemarks are dropped for readability so the output is not real JSON.
 *
 * {{ {complex: 'data', structure: []} | libJSONify }}
 *
 */

@Pipe({ name: 'libJSONify' })

export class JSONifyPipe implements PipeTransform {

  transform(s: string,
            dflt = ''): string {
    if (s == null)
      return dflt;
    else if (Array.isArray(s) || (typeof s === 'object'))
      return `${JSON.stringify(s, null, ' ')}`;
    else return s;
  }

}
