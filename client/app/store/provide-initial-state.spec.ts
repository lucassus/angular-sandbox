import { inject, TestBed } from '@angular/core/testing';
import { INITIAL_STATE } from '@ngrx/store';
import { stub } from 'sinon';
import { LocalStorageService } from '../local-storage.service';

import { provideInitialState } from './provide-initial-state';
import { IApplicationState } from './records/application-state';

describe('.provideInitialState', () => {

  let fakeLocalStorageService;

  beforeEach(() => {
    fakeLocalStorageService = {
      get: stub().withArgs('authenticated').returns('true')
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: fakeLocalStorageService },
        provideInitialState()
      ]
    });
  });

  it('configures the initial state', inject([INITIAL_STATE], (initialState: IApplicationState) => {
    expect(initialState.session.authenticated).toBeTruthy();
  }));

});
