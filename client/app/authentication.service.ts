import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  authenticate({ login, password }): Observable<boolean> {
    return this.http.post('/api/authenticate', { login, password })
      .map(() => true)
      .catch(() => Observable.of(false));
  }

}
