import { Record } from 'immutable';

import { Address } from './address';

const ContactRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  favourite: false,
  createdAt: null,
  updatedAt: null,

  address: new Address()
});

export class Contact extends ContactRecord {

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  favourite: boolean;
  createdAt: number;
  updatedAt: number;

  address: Address;

  constructor(nestedData: any = {}) {
    const { address: addressData, ...data } = nestedData;

    super({
      ...data,
      address: new Address(addressData)
    });
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  hasAddress(): boolean {
    return this.address.isPresent();
  }

  isPersisted(): boolean {
    return Boolean(this.id);
  }

}
