import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ConnectionBackend, BaseRequestOptions, Http, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ContactsService } from './contacts.service';
import { Contact } from './contact';

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
          expect(contacts.length).toBe(2);

          expect(contacts[0] instanceof Contact).toBe(true);
          expect(contacts[0].id).toBe(1);
          expect(contacts[0].firstName).toBe('Luke');

          expect(contacts[1] instanceof Contact).toBe(true);
          expect(contacts[1].id).toBe(2);
          expect(contacts[1].firstName).toBe('Anakin');
        });

        tick();
      }));

    });

    describe('on error', () => {

      beforeEach(() => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
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

});