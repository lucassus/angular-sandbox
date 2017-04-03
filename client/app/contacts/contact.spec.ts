import { stub } from 'sinon';

import { Address } from './address';
import { Contact } from './contact';

describe('Contact', () => {

  it('can be instantiated with default values', () => {
    const contact = new Contact({
      id: 1, firstName: 'Luke',
      address: { town: 'Kraków' }
    });

    expect(contact.id).toEqual(1);
    expect(contact.firstName).toEqual('Luke');
    expect(contact.lastName).toEqual(null);

    expect(contact.address instanceof Address).toBeTruthy();
    expect(contact.address.street).toBeNull();
    expect(contact.address.town).toEqual('Kraków');
    expect(contact.address.zipCode).toBeNull();
  });

  describe('.fullName', () => {

    it('returns contact full name', () => {
      const contact = new Contact({ firstName: 'Anakin', lastName: 'Skywalker' });
      expect(contact.fullName).toEqual('Anakin Skywalker');
    });

  });

  describe('.hasAddress', () => {

    let contact: Contact;

    beforeEach(() => {
      contact = new Contact();
    });

    it('returns true when the address is present', () => {
      stub(contact.address, 'isPresent').returns(true);
      expect(contact.hasAddress()).toBeTruthy();
    });

    it('returns false when the address is not present', () => {
      stub(contact.address, 'isPresent').returns(false);
      expect(contact.hasAddress()).toBeFalsy();
    });

  });

  describe('.isPersisted', () => {

    it('returns true when a contact has an id', () => {
      const contact = new Contact({ id: 123 });
      expect(contact.isPersisted()).toBeTruthy();
    });

    it('returns false when a contact does not have an id', () => {
      const contact = new Contact({ id: null });
      expect(contact.isPersisted()).toBeFalsy();
    });

  });

});
