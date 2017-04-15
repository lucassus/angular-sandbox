import { Address } from './address';

describe('Address', () => {

  it('can be instantiated with default values', () => {
    const address = new Address({
      town: 'Kraków',
      zipCode: '31-502',
      countryCode: 'PL'
    });

    expect(address.street).toBeNull();
    expect(address.town).toEqual('Kraków');
    expect(address.zipCode).toEqual('31-502');
    expect(address.countryCode).toEqual('PL');
  });

});
