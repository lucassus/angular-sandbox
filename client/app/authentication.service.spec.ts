import { TestBed } from '@angular/core/testing';
import { RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { HTTP_MOCK_PROVIDERS } from '../testing/index';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {

  let mockBackend: MockBackend;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HTTP_MOCK_PROVIDERS,
        AuthenticationService
      ]
    });

    mockBackend = TestBed.get(MockBackend);
    authenticationService = TestBed.get(AuthenticationService);
  });

  describe('.login', () => {

    let connection: MockConnection;
    const credentials = { login: 'login', password: 'password' };

    beforeEach(() => {
      mockBackend.connections.subscribe((c: MockConnection) => {
        connection = c;

        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request.url).toBe('/api/authenticate');

        const expectedCredentials = JSON.parse(connection.request.getBody());
        expect(expectedCredentials.login).toEqual('login');
        expect(expectedCredentials.password).toEqual('password');
      });
    });

    describe('on success', () => {

      it('emits true', () => {
        authenticationService.authenticate(credentials).subscribe((result) => {
          expect(result).toBeTruthy();
        });

        connection.mockRespond(new Response(new ResponseOptions({
          status: 200
        })));
      });

    });

    describe('on error', () => {

      it('emits false', () => {
        authenticationService.authenticate(credentials).subscribe((result) => {
          expect(result).toBeFalsy();
        });

        connection.mockError();
      });

    });

  });

});
