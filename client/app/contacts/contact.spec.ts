import { Contact } from './contact';

describe('Contact', () => {

  it('can be instantiated with default values', () => {
    const contact = new Contact({ id: 1, firstName: 'Luke' });

    expect(contact.id).toEqual(1);
    expect(contact.firstName).toEqual('Luke');
    expect(contact.lastName).toEqual(null);
  });

  describe('.fullName', () => {

    it('returns contact full name', () => {
      const contact = new Contact({ firstName: 'Anakin', lastName: 'Skywalker' });
      expect(contact.fullName).toEqual('Anakin Skywalker');
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
