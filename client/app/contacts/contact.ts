import { Record } from 'immutable';

const ContactRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  favourite: false,
  createdAt: null,
  updatedAt: null
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

  constructor(data?: any) {
    super(data);
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  isPersisted(): boolean {
    return Boolean(this.id);
  }

}
