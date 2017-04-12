import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
