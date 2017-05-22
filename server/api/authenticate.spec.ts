import * as request from 'supertest';

import { app } from '../app';

describe('app', () => {

  describe('POST /api/authenticate', () => {

    describe('on success', () => {

      const credentials = {
        login: 'admin',
        password: 'password'
      };

      it('responds with 200', (done) => {
        request(app)
          .post('/api/authenticate')
          .set('Accept', 'application/json')
          .send(credentials)
          .expect('Content-Type', /text/)
          .expect(200)
          .end(done);
      });

    });

    describe('on error', () => {

      const credentials = {
        login: 'admin',
        password: 'wrong'
      };

      it('responds with 422', (done) => {
        request(app)
          .post('/api/authenticate')
          .set('Accept', 'application/json')
          .send(credentials)
          .expect('Content-Type', /text/)
          .expect(422)
          .end(done);
      });

    });

  });

});
