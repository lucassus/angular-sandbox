import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Action, Store } from '@ngrx/store';
import { stub } from 'sinon';

import { click, MockStore } from '../../testing';
import { FakeRouterLinkDirective } from '../../testing/router-stubs';
import { DEFAULT_APPLICATION_STATE, IApplicationState } from '../store/application-state';
import { SESSION_LOGOUT } from '../store/session-actions';
import { SessionState } from '../store/session-reducer';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {

  let store: MockStore<IApplicationState>;

  let fixture: ComponentFixture<NavigationComponent>;
  let component: NavigationComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FakeRouterLinkDirective,
        NavigationComponent
      ],
      providers: [{
        provide: NgbModal, useValue: { open: stub() }
      }, {
        provide: Store,
        useValue: new MockStore<IApplicationState>(DEFAULT_APPLICATION_STATE)
      }],
      schemas: [NO_ERRORS_SCHEMA]
    });

    store = TestBed.get(Store);

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

  describe('authentication button', () => {

    function findLinkEl() {
      return fixture.debugElement
        .query(By.css('.navbar-nav.navbar-right .nav-item'))
        .nativeElement;
    }

    describe('when authenticated', () => {

      beforeEach(() => {
        store.next({ session: new SessionState({ authenticated: true }) });
        fixture.detectChanges();
      });

      it('displays log out button', () => {
        expect(findLinkEl().textContent).toContain('Logout');
      });

    });

    describe('when not authenticated', () => {

      beforeEach(() => {
        store.next({ session: new SessionState({ authenticated: false }) });
        fixture.detectChanges();
      });

      it('displays log out button', () => {
        expect(findLinkEl().textContent).toContain('Login');
      });

    });

  });

  describe('.logout', () => {

    it(`dispatches ${SESSION_LOGOUT} action`, () => {
      component.logout();

      expect(store.dispatch.called).toBeTruthy();

      const action: Action = store.dispatch.lastCall.args[0];
      expect(action.type).toEqual(SESSION_LOGOUT);
    });

  });

});
