import { TestBed } from '@angular/core/testing';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { go } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import { stub } from 'sinon';

import { AuthenticationService } from '../../authentication.service';
import {
  AuthenticationErrorAction,
  AuthenticationSuccessAction,
  LogoutAction,
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

      it('dispatches valid actions', () => {
        runner.queue(new RequestAuthenticationAction({
          ...credentials,
          returnUrl: '/foo/bar'
        }));

        const actions = [];

        effect.requestAuthentication$.subscribe((action) => {
          actions.push(action)
        });

        expect(actions.length).toEqual(2);
        expect(actions[0] instanceof AuthenticationSuccessAction).toBeTruthy();
        expect(actions[1]).toEqual(go(['/foo/bar']));

        expect(fakeAuthentication.authenticate.calledWith(credentials))
          .toBeTruthy();
      });

    });

    describe('on login error', () => {

      beforeEach(() => {
        fakeAuthentication.authenticate
          .returns(Observable.of(false));
      });

      it('dispatches valid actions', () => {
        runner.queue(new RequestAuthenticationAction({
          ...credentials,
          returnUrl: '/foo/bar'
        }));

        effect.requestAuthentication$.subscribe((action) => {
          expect(action instanceof AuthenticationErrorAction).toBeTruthy();
        });

        expect(fakeAuthentication.authenticate.calledWith(credentials))
          .toBeTruthy();
      });

    });

  });

  describe('.logout$', () => {

    it('dispatches valid action', () => {
      runner.queue(new LogoutAction());

      effect.logout$.subscribe((action) => {
        expect(action).toEqual(go(['/']));
      });
    });

  });

});
