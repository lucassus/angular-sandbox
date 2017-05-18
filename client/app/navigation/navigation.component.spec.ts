import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { stub } from 'sinon';

import { click } from '../../testing';
import { FakeRouterLinkDirective } from '../../testing/router-stubs';
import { NavigationComponent } from './navigation.component';
import { Observable } from 'rxjs/Observable';

describe('NavigationComponent', () => {

  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FakeRouterLinkDirective,
        NavigationComponent
      ],
      providers: [{
        provide: NgbModal, useValue: { open: stub() }
      }, {
        provide: Store, useValue: {
          select: stub().returns(Observable.of(false)),
          dispatch: stub()
        }
      }],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function findLinkDebugElements() {
    return fixture.debugElement
      .queryAll(By.directive(FakeRouterLinkDirective));
  }

  function findLinkFor(path) {
    return findLinkDebugElements().map((debugElement) => {
      const componentInstance = debugElement
        .injector.get(FakeRouterLinkDirective);

      return { debugElement, componentInstance };
    }).find(({ componentInstance }) => {
      return componentInstance.linkParams === path;
    });
  }

  it('has navigation links', () => {
    expect(findLinkDebugElements().length).toEqual(4);

    expect(findLinkFor('/')).not.toBeUndefined();
    expect(findLinkFor('/contacts')).not.toBeUndefined();
    expect(findLinkFor('/sandbox')).not.toBeUndefined();
    expect(findLinkFor('/unknown')).toBeUndefined();
  });

  it('can navigate to contacts', () => {
    const { debugElement, componentInstance } = findLinkFor('/contacts');
    click(debugElement);
    expect(componentInstance.navigatedTo).toEqual('/contacts');
  });

  it('can navigate to sandbox', () => {
    const { debugElement, componentInstance } = findLinkFor('/sandbox');
    click(debugElement);
    expect(componentInstance.navigatedTo).toEqual('/sandbox');
  });

});
