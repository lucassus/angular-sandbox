import { Directive, Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class FakeRouterLinkDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

@Injectable()
export class FakeActivatedRoute {

  // ActivatedRoute.params is Observable
  private subject = new BehaviorSubject(this.testData);
  data = this.subject.asObservable();

  // Test data
  private _testData: {};

  get testData() {
    return this._testData;
  }

  set testData(data: {}) {
    this._testData = data;
    this.subject.next(data);
  }

}
