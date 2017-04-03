import { Record } from 'immutable';

const AddressRecord = Record({
  street: null,
  town: null,
  zipCode: null,
  country: null
});

export class Address extends AddressRecord {

  street: string;
  town: string;
  zipCode: string;
  country: string;

  constructor(data: any = {}) {
    super(data);
  }

  isPresent(): boolean {
    return Boolean(this.street || this.town || this.zipCode);
  }

}
