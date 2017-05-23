import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { stub } from 'sinon';

import { MockStore } from '../../testing/index';
import { AuthenticationService } from '../authentication.service';
import { IApplicationState } from '../store/records/application-state';
import { SessionState } from '../store/records/session-state';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let store: Store<IApplicationState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            queryParams: { returnUrl: '/foo/bar' }
          }
        }
      }, {
        provide: AuthenticationService, useValue: {
          login: stub().returns(Observable.of(true))
        }
      }, {
        provide: Store,
        useValue: new MockStore<IApplicationState>({ session: new SessionState(), router: null })
      }],
      declarations: [LoginComponent]
    });

    store = TestBed.get(Store);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('.login', () => {

    it('creates a session', () => {
      // Given
      const credentials = {
        login: 'admin',
        password: 'password'
      };

      component.loginForm.get('login').setValue(credentials.login);
      component.loginForm.get('password').setValue(credentials.password);

      // When
      component.login();

      // Then
      expect(store.dispatch['called']).toBeTruthy();

      const action = store.dispatch['lastCall'].args[0];
      expect(action.payload.login).toEqual(credentials.login);
      expect(action.payload.password).toEqual(credentials.password);
      expect(action.payload.returnUrl).toEqual('/foo/bar');
    });

  });

});
