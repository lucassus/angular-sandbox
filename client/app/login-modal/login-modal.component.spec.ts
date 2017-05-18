import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { stub, spy } from 'sinon';

import { IApplicationState } from '../store/application-state';
import { session } from '../store/session-reducer';
import { AuthenticationService } from '../authentication.service';
import { LoginModalComponent } from './login-modal.component';

describe('LoginModalComponent', () => {

  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;

  let store: Store<IApplicationState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.provideStore(combineReducers({ session }))
      ],
      providers: [{
        provide: NgbActiveModal, useValue: { close: stub() }
      }, {
        provide: AuthenticationService, useValue: {
          login: stub().returns(Observable.of(true))
        }
      }],
      declarations: [LoginModalComponent]
    });

    store = TestBed.get(Store);

    fixture = TestBed.createComponent(LoginModalComponent);
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
