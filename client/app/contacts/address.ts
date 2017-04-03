import { Record } from 'immutable';

export interface ICountry {
  code: string;
  name: string;
}

const AddressRecord = Record({
  street: null,
  town: null,
  zipCode: null,
  countryCode: null
});

export class Address extends AddressRecord {

  street: string;
  town: string;
  zipCode: string;
  countryCode: string;

  constructor(data: any = {}) {
    super(data);
  }

  isPresent(): boolean {
    return Boolean(this.street || this.town || this.zipCode);
  }

}
