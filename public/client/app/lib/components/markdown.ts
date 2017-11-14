import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

import { AutoUnsubscribe } from '../decorators/auto-unsubscribe';
import { HttpClient } from '@angular/common/http';
import { LifecycleComponent } from './lifecycle-component';
import { Subscription } from 'rxjs/Subscription';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

declare var marked: any;

/** Markdowncomponent */

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'lib-markdown',
  styleUrls: ['markdown.less'],
  templateUrl: 'markdown.html'
})

@AutoUnsubscribe()
export class MarkdownComponent extends LifecycleComponent {

  private static cache = {};

  @ViewChild('markdown') markdown;

  private subToLoader: Subscription;

  /** ctor */
  constructor(private http: HttpClient) {
    super();
  }

  // property accessors / mutators

  @Input() set src(uri: string) {
    if (uri) {
      const cached = MarkdownComponent.cache[uri];
      const errmsg = `Document <a>${uri}</a> could not be loaded; please try again`;
      const obs = (cached? of(cached) : this.http.get(uri, {responseType: 'text'}));
      this.subToLoader = obs.pipe(
          catchError(error => of(errmsg))
        ).subscribe((md: string) => {
          MarkdownComponent.cache[uri] = md;
          this.markdown.nativeElement.innerHTML = md? marked(md) : '';
        });
    }
  }

}
