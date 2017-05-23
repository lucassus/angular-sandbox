import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { IApplicationState } from '../store/records/application-state';
import { ClearAuthenticationError, RequestAuthenticationAction } from '../store/session-actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  authenticationError$ = this.store
    .select((store) => store.session.authenticationError);

  authenticationPending$ = this.store
    .select((store) => store.session.authenticationPending);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<IApplicationState>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['admin', Validators.required],
      password: ['password', Validators.required],
    });

    this.clearErrors();
    this.loginForm.valueChanges.subscribe(() => this.clearErrors());
  }

  private clearErrors() {
    this.store.dispatch(new ClearAuthenticationError());
  }

  login() {
    const { login, password } = this.loginForm.value;
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];

    this.store.dispatch(new RequestAuthenticationAction({
      login,
      password,
      returnUrl
    }));
  }

}
