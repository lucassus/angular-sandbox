import * as assert from 'power-assert';
import * as sinon from 'sinon';

import { app } from './app';
import { db } from './db';

describe('server', () => {

  const sandbox = sinon.sandbox.create();
  let listenSpy, seedSpy;

  beforeEach(() => {
    sandbox.stub(console, 'log');

    seedSpy = sandbox.stub(db, 'seed').returns({
      then: sandbox.stub().yields([])
    });

    listenSpy = sandbox.stub(app, 'listen').yields();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('seeds the db and starts the app', () => {
    require('./server');

    assert(seedSpy.called);
    assert(listenSpy.called);
  });

});
