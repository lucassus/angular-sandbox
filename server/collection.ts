import * as Promise from 'bluebird';
import * as _ from 'lodash';

function *idGenerator() {
  let id = 1;

  /* eslint-disable no-constant-condition */
  while (true) {
    yield id;
    id = id + 1;
  }
}

export class Collection {

  private _id;
  private _documents;

  constructor() {
    this._initialize();
  }

  _initialize() {
    this._id = idGenerator();
    this._documents = [];
  }

  drop() {
    this._initialize();
    return Promise.resolve();
  }

  _nextId() {
    return this._id.next().value;
  }

  find() {
    return Promise.resolve(this._documents);
  }

  findOne(query) {
    const contact = _.find(this._documents, query);

    if (contact) {
      return Promise.resolve(contact);
    } else {
      return Promise.reject();
    }
  }

  insertOne(data) {
    const now = new Date().getTime();

    const contact = _.extend({}, data, {
      id: this._nextId(),
      createdAt: now,
      updatedAt: now
    });
    this._documents.push(contact);

    return Promise.resolve(contact);
  }

  updateOne(query, data) {
    return this.findOne(query).then((contact) => {
      const now = new Date().getTime();

      return _.extend(contact, data, {
        updatedAt: now
      });
    });
  }

  deleteOne(query) {
    return this.findOne(query).then((contact) => {
      const index = _.findIndex(this._documents, contact);
      this._documents.splice(index, 1);

      return Promise.resolve(index);
    });
  }

}
