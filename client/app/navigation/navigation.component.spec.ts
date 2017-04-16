import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { click } from '../../testing';
import { FakeRouterLinkDirective } from '../../testing/router-stubs';
import { IAppState, rootReducer } from '../store/root-reducer';
import { NavigationComponent } from './navigation.component';

@NgModule({
  imports: [NgReduxModule]
})
class FakeNgReduxModule {

  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, {});
  }

}

describe('NavigationComponent', () => {

  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FakeNgReduxModule
      ],
      declarations: [
        FakeRouterLinkDirective,
        NavigationComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function findLinkDes() {
    return fixture.debugElement
      .queryAll(By.directive(FakeRouterLinkDirective));
  }

  function findLinkFor(path) {
    return findLinkDes()
      .map((debugElement) => {
        const componentInstance = debugElement
          .injector.get(FakeRouterLinkDirective);

        return { debugElement, componentInstance };
      })
      .find(({ componentInstance }) => {
        return componentInstance.linkParams === path;
      });
  }

  it('has navigation links', () => {
    expect(findLinkDes().length).toEqual(4);

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

  describe('.login', () => {

    it('updates the state', inject([NgRedux], (ngRedux: NgRedux<IAppState>) => {
      expect(ngRedux.getState().session.authenticated).toBeFalsy();
      component.login();
      expect(ngRedux.getState().session.authenticated).toBeTruthy();
    }));

  });

});
