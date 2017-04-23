import {Pipe, PipeTransform} from '@angular/core';


/**
 * Converts arrays and objects into JSON-like strings, usually for diagnostic
 * purposes but sometimes when no other mecahanism is available.
 *
 * NOTE: quotemarks are dropped for readability so the output is not real JSON.
 *
 * {{ {complex: 'data', structure: []} | piJSONify }}
 *
 */

@Pipe({ name: 'piJSONify' })

export class JSONifyPipe implements PipeTransform {

  transform(s: string) {
    if ((s === null) || (s === undefined))
      return '';
    else if (Array.isArray(s) || (typeof s === 'object'))
      return `${JSON.stringify(s).replace(new RegExp('"', 'g'), '')}`;
    else return s;
  }

}