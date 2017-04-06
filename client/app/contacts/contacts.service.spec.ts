import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { List } from 'immutable';

import { Contact } from './contact';
import { ContactsService } from './contacts.service';

describe('ContactsService', () => {

  let mockBackend: MockBackend;
  let contactsService: ContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => {
            return new Http(backend, options);
          }
        },
        ContactsService
      ]
    });

    mockBackend = TestBed.get(MockBackend);
    contactsService = TestBed.get(ContactsService);
  });

  describe('.query', () => {

    describe('on success', () => {

      beforeEach(() => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe('/api/contacts');

          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify({
              contacts: [{
                id: 1, firstName: 'Luke'
              }, {
                id: 2, firstName: 'Anakin'
              }]
            })
          })));
        });
      });

      it('should resolve all contacts', fakeAsync(() => {
        contactsService.query().then((contacts) => {
          expect(contacts instanceof List).toBe(true);
          expect(contacts.size).toBe(2);

          const first = contacts.get(0);
          expect(first instanceof Contact).toBe(true);
          expect(first.id).toBe(1);
          expect(first.firstName).toBe('Luke');

          const second = contacts.get(1);
          expect(second instanceof Contact).toBe(true);
          expect(second.id).toBe(2);
          expect(second.firstName).toBe('Anakin');
        });

        tick();
      }));

    });

    describe('on error', () => {

      beforeEach(() => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe('/api/contacts');

          connection.mockError(new Error('Something went wrong...'));
        });
      });

      it('should reject', fakeAsync(() => {
        contactsService.query().catch((error) => {
          expect(error.message).toBe('Something went wrong...');
        });

        tick();
      }));

    });

  });

  describe('.get', () => {

    describe('on success', () => {

      beforeEach(() => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.url).toBe('/api/contacts/123');

          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify({ id: 123, firstName: 'Luke' })
          })));
        });
      });

      it('should resolve a contact', fakeAsync(() => {
        contactsService.get(123).then((contact: Contact) => {
          expect(contact).not.toBeUndefined();

          expect(contact.id).toEqual(123);
          expect(contact.firstName).toEqual('Luke');
        });

        tick();
      }));

    });

  });

  describe('.create', () => {

    describe('.on success', () => {

      beforeEach(() => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.method).toEqual(RequestMethod.Post);
          expect(connection.request.url).toEqual('/api/contacts');

          const data = JSON.parse(connection.request.getBody());
          expect(data.firstName).toEqual('Luke');
          expect(data.lastName).toEqual('Skywalker');

          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify({ id: 125, firstName: 'Luke', lastName: 'Skywalker' })
          })));
        });
      });

      it('should create a contact', fakeAsync(() => {
        contactsService.create({ firstName: 'Luke', lastName: 'Skywalker' }).then((contact: Contact) => {
          expect(contact).not.toBeUndefined();

          expect(contact.id).toEqual(125);
          expect(contact.firstName).toEqual('Luke');
          expect(contact.lastName).toEqual('Skywalker');
        });

        tick();
      }));

    });

  });

  describe('.update', () => {

    describe('on success', () => {

      beforeEach(() => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.method).toEqual(RequestMethod.Put);
          expect(connection.request.url).toEqual('/api/contacts/124');

          const data = JSON.parse(connection.request.getBody());
          expect(data.firstName).toEqual('Luke');
          expect(data.lastName).toEqual('Skywalker');

          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify({ id: 124, firstName: 'Luke', lastName: 'Skywalker', updatedAt: 12345678 })
          })));
        });
      });

      it('should update a contact', fakeAsync(() => {
        contactsService.update(124, { firstName: 'Luke', lastName: 'Skywalker' }).then((contact: Contact) => {
          expect(contact).not.toBeUndefined();

          expect(contact.id).toEqual(124);
          expect(contact.firstName).toEqual('Luke');
          expect(contact.lastName).toEqual('Skywalker');
          expect(contact.updatedAt).toEqual(12345678);
        });

        tick();
      }));

    });

  });

  describe('.checkEmailUniqueness', () => {

    describe('when an email is unique', () => {

      const contact = new Contact({
        email: 'test@email.com'
      });

      beforeEach(() => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.method).toEqual(RequestMethod.Get);
          expect(connection.request.url).toEqual(`/api/contacts/validate-email?id=null&email=${contact.email}`);

          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify({ email: contact.email, taken: false })
          })));
        });

      });

      it('should return valid response', () => {
        contactsService.checkEmailUniqueness(contact.id, contact.email).subscribe((result) => {
          const { email, taken } = result;

          expect(email).toEqual(contact.email);
          expect(taken).toBeFalsy();
        });
      });

    });

  });

});
