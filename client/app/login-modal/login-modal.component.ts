import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { IApplicationState } from '../store/application-state';
import { ClearAuthenticationError, RequestAuthenticationAction } from '../store/session-actions';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html'
})
export class LoginModalComponent implements OnInit{

  loginForm: FormGroup;

  authenticated$ = this.store
    .select((store) => store.session.authenticated);

  authenticationError$ = this.store
    .select((store) => store.session.authenticationError);

  authenticationPending$ = this.store
    .select((store) => store.session.authenticationPending);

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private store: Store<IApplicationState>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['admin', Validators.required],
      password: ['password', Validators.required],
    });

    this.clearErrors();
    this.loginForm.valueChanges.subscribe(() => this.clearErrors());

    this.authenticated$.subscribe((authenticated) => {
      if (authenticated) {
        this.close();
      }
    });
  }

  private clearErrors() {
    this.store.dispatch(new ClearAuthenticationError());
  }

  close() {
    this.activeModal.close();
  }

  login() {
    const { login, password } = this.loginForm.value;

    this.store.dispatch(new RequestAuthenticationAction({
      login, password
    }));
  }

}
