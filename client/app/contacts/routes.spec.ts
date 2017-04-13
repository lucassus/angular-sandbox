import { fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { List } from 'immutable';
import { createStubInstance } from 'sinon';

import { Contact } from './contact';
import { ContactsService } from './contacts.service';
import { ContactResolver, ContactsResolver } from './routes';

describe('ContactsResolver', () => {

  let fakeContactsService;
  let resolver: ContactsResolver;

  const contacts = List<Contact>([
    new Contact({ id: 10 }),
    new Contact({ id: 11 })
  ]);

  beforeEach(() => {
    fakeContactsService = createStubInstance(ContactsService);
    fakeContactsService.query.returns(Promise.resolve(contacts));

    resolver = new ContactsResolver(fakeContactsService);
  });

  describe('.resolve', () => {

    it('resolves a list of contacts', fakeAsync(() => {
      // When
      resolver.resolve().then((resolvedContacts) => {
        expect(resolvedContacts).toBe(contacts);
      });

      tick();

      // Then
      expect(fakeContactsService.query.called).toBeTruthy();
    }));

  });

});

describe('ContactResolver', () => {

  let fakeContactsService;
  let resolver: ContactResolver;

  const contact = new Contact({ id: 12 });

  beforeEach(() => {
    fakeContactsService = createStubInstance(ContactsService);
    fakeContactsService.get.returns(Promise.resolve(contact));

    resolver = new ContactResolver(fakeContactsService);
  });

  describe('.resolve', () => {

    it('resolves a list of contacts', fakeAsync(() => {
      // Given
      const route = new ActivatedRouteSnapshot();
      route.params = { id: 12 };

      // When
      resolver.resolve(route).then((resolvedContact) => {
        expect(resolvedContact).toBe(contact);
      });

      tick();

      // Then
      expect(fakeContactsService.get.called).toBeTruthy();
    }));

  });

});
