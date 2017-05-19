import * as request from 'supertest';

import { app } from '../app';

describe('app', () => {

  describe('POST /api/authenticate', () => {

    describe('on success', () => {

      it('responds with 200', (done) => {
        const login = 'admin';
        const password = 'password';

        request(app)
          .post('/api/contacts')
          .set('Accept', 'application/json')
          .send({ login, password })
          .expect('Content-Type', /json/)
          .expect(200)
          .end(done);
      });

    });

    describe('on error', () => {

      it('responds with 422', (done) => {
        const login = 'login';
        const password = 'wrong';

        request(app)
          .post('/api/contacts')
          .set('Accept', 'application/json')
          .send({ login, password })
          .expect('Content-Type', /json/)
          .expect(422)
          .end(done);
      });

    });

  });

});
