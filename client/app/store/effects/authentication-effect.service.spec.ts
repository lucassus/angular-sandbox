import { TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import { stub } from 'sinon';

import { AuthenticationService } from '../../authentication.service';
import {
  AuthenticationErrorAction,
  AuthenticationSuccessAction,
  RequestAuthenticationAction
} from '../session-actions';
import { AuthenticationEffectService } from './authentication-effect.service';

describe('AuthenticationEffectService', () => {

  let fakeAuthentication;

  let effect: AuthenticationEffectService;
  let runner: EffectsRunner;

  beforeEach(() => {
    fakeAuthentication = { authenticate: stub() };

    TestBed.configureTestingModule({
      imports: [EffectsTestingModule],
      providers: [
        { provide: AuthenticationService, useValue: fakeAuthentication },
        AuthenticationEffectService
      ]
    });

    effect = TestBed.get(AuthenticationEffectService);
    runner = TestBed.get(EffectsRunner);
  });

  describe('.requestAuthentication$ effect', () => {

    const credentials = {
      login: 'luke',
      password: 'password1'
    };

    describe('on login success', () => {

      beforeEach(() => {
        fakeAuthentication.authenticate
          .returns(Observable.of(true));
      });

      it('returns valid action', () => {
        runner.queue(new RequestAuthenticationAction(credentials));

        effect.requestAuthentication$.subscribe((action) => {
          expect(action instanceof AuthenticationSuccessAction).toBeTruthy();
        });

        expect(fakeAuthentication.authenticate.calledWith(credentials))
          .toBeTruthy();
      });

    });

    describe('on login error', () => {

      beforeEach(() => {
        fakeAuthentication.authenticate
          .returns(Observable.of(false));
      });

      it('returns valid action', () => {
        runner.queue(new RequestAuthenticationAction(credentials));

        effect.requestAuthentication$.subscribe((action) => {
          expect(action instanceof AuthenticationErrorAction).toBeTruthy();
        });

        expect(fakeAuthentication.authenticate.calledWith(credentials))
          .toBeTruthy();
      });

    });

  });

});
