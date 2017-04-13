import * as assert from 'power-assert';
import * as request from 'supertest';

import { app } from '../app';
import { db } from '../db';

describe('app', () => {

  describe('POST /api/seed', () => {

    it('seeds the database', (done) => {
      request(app)
        .post('/api/seed')
        .expect(200)
        .end(() => {
          db.contacts.find().then((contacts) => {
            assert(contacts.length === 20);
            done();
          });
        });
    });

  });

});
