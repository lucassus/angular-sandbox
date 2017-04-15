import { Record } from 'immutable';

import { Address, IAddress } from './address';

export interface IContact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  favourite: boolean;
  createdAt: number;
  updatedAt: number;

  address: Partial<IAddress>;
}

const ContactRecord = Record<IContact>({
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

  constructor(nestedData: Partial<IContact> = {}) {
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
    const { address } = this;
    return Boolean(address.street || address.town || address.zipCode);
  }

  isPersisted(): boolean {
    return Boolean(this.id);
  }

}
