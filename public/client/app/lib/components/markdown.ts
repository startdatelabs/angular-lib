import { } from '@types/marked';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { Http, Response, ResponseOptions } from '@angular/http';

import { AutoUnsubscribe } from '../decorators/auto-unsubscribe';
import { LifecycleComponent } from './lifecycle-component';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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

  content: string;
  loading: boolean;

  private subToLoader: Subscription;

  /** ctor */
  constructor(private http: Http) {
    super();
  }

  // property accessors / mutators

  @Input() set src(uri: string) {
    if (uri) {
      const cached = MarkdownComponent.cache[uri];
      const errorResponse = new Response(new ResponseOptions({body: `Document <a>${uri}</a> could not be loaded; please try again.`}));
      this.subToLoader = (cached? Observable.of(cached) : this.http.get(uri))
        .catch((response: Response) => Observable.of(errorResponse))
        .do((response: Response) => MarkdownComponent.cache[uri] = response)
        .map((response: Response) => response.text())
        .subscribe((md: string) => {
          this.markdown.nativeElement.innerHTML = marked(md);
        });
    }
  }

}
