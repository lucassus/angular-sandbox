import { Record } from 'immutable';

export interface ICountry {
  code: string;
  name: string;
}

export interface IAddress {
  street: string;
  town: string;
  zipCode: string;
  countryCode: string;
}

const AddressRecord = Record<IAddress>({
  street: null,
  town: null,
  zipCode: null,
  countryCode: null
});

export class Address extends AddressRecord {

  constructor(data: Partial<IAddress> = {}) {
    super(data);
  }

}
