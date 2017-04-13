import * as assert from 'power-assert';
import * as Promise from 'bluebird';

import { Collection } from './collection';

describe('Collection', () => {

  let collection;

  beforeEach(() => {
    collection = new Collection();
  });

  describe('.drop', () => {

    beforeEach(() => {
      return collection.insertOne({ email: 'test@email.com' });
    });

    it('removes all documents', () => {
      return collection.drop().then(() => {
        return collection.find().then((documents) => {
          assert.equal(documents.length, 0);
        });
      });
    });

    it('reset current id', () => {
      return collection.drop().then(() => {
        assert.equal(collection._nextId(), 1);
        assert.equal(collection._nextId(), 2);
        assert.equal(collection._nextId(), 3);
      });
    });

  });

  describe('.find', () => {

    beforeEach(() => {
      return Promise.all([
        collection.insertOne({ mail: 'foo@email.com' }),
        collection.insertOne({ mail: 'bar@email.com' })
      ]);
    });

    it('returns all documents', () => {
      return collection.find().then((documents) => {
        assert.equal(documents.length, 2);
      });
    });

  });

  describe('.findOne', () => {

    const email = 'foo@bar.com';

    beforeEach(() => {
      return collection.insertOne({ email });
    });

    describe('when a document can be found', () => {

      it('resolves with the found document', () => {
        return collection.findOne({ email }).then((document) => {
          assert(document);
          assert.equal(document.email, email);
        });
      });

    });

    describe('when a document cannot be found', () => {

      it('rejects', (done) => {
        collection.findOne({ email: 'foo@baz.com' }).catch(() => {
          done();
        });
      });

    });

  });

  describe('.insertOne', () => {

    it('inserts a document', () => {
      return collection.insertOne({ email: 'foo@email.com' }).then(() => {
        return collection.find().then((documents) => {
          assert.equal(documents.length, 1);
          assert(documents[0].id);
          assert.equal(documents[0].email, 'foo@email.com');
          assert(documents[0].createdAt);
          assert(documents[0].updatedAt);
        });
      });
    });

  });

  describe('.updateOne', () => {

    let id;

    beforeEach(() => {
      return collection.insertOne({ firstName: 'Anakin' }).then((document) => {
        id = document.id;
      });
    });

    it('updates a document', () => {
      return collection.updateOne({ id }, { firstName: 'Luke' }).then((document) => {
        assert.equal(document.id, id);
        assert.equal(document.firstName, 'Luke');
        assert(document.updatedAt);
        assert(document.createdAt);
      });
    });

  });

  describe('.deleteOne', () => {

    let id;

    beforeEach(() => {
      return collection.insertOne({ firstName: 'Anakin' }).then((document) => {
        id = document.id;
      });
    });

    it('deletes a document', () => {
      return collection.deleteOne({ id }).then(() => {
        return collection.find().then((documents) => {
          assert.equal(documents.length, 0);
        });
      });
    });

  });

});
