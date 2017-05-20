import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { spy, stub } from 'sinon';

import { AuthenticationService } from '../authentication.service';
import { IApplicationState } from '../store/records/application-state';
import { session } from '../store/reducers/session-reducer';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let store: Store<IApplicationState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.provideStore(combineReducers({ session }))
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            queryParams: { returnUrl: '/foo/bar' }
          }
        }
      }, {
        provide: Router,
        useValue: { navigate: stub() }
      }, {
        provide: AuthenticationService, useValue: {
          login: stub().returns(Observable.of(true))
        }
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

      const dispatchSpy = spy(store, 'dispatch');

      // When
      component.login();

      // Then
      expect(dispatchSpy.called).toBeTruthy();

      const action = dispatchSpy.lastCall.args[0];
      expect(action.payload.login).toEqual(credentials.login);
      expect(action.payload.password).toEqual(credentials.password);
    });

  });

});
