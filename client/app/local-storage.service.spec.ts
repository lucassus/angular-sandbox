import { stub } from 'sinon';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {

  let storage: any;
  let localStorage: LocalStorageService;

  beforeEach(() => {
    storage = {
      getItem: stub(),
      setItem: stub(),
      removeItem: stub()
    };

    localStorage = new LocalStorageService(storage);
  });

  describe('.get', () => {

    beforeEach(() => {
      storage.getItem.withArgs('foo')
        .returns('bar');
    });

    it('retrieves an item', () => {
      expect(localStorage.get('foo')).toEqual('bar');
    });

  });

  describe('.set', () => {

    it('sets an item', () => {
      localStorage.set('foo', 'bar');
      expect(storage.setItem.calledWith('foo', 'bar')).toBeTruthy();
    });

  });

  describe('.remove', () => {

    it('removes an item', () => {
      localStorage.remove('foo');
      expect(storage.removeItem.calledWith('foo')).toBeTruthy();
    });

  });

  describe('.length', () => {

    it('returns the length', () => {
      storage.length = 3;
      expect(localStorage.length).toEqual(3);
    });

  });

});
