import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Contact } from './contact';

function buildContact({ id, firstName, lastName, email, phone, updatedAt }): Contact {
  return new Contact(id, firstName, lastName, email, phone, updatedAt);
}

@Injectable()
export class ContactsService {

  constructor(private http: Http) { }

  query(): Promise<Array<Contact>> {
    return this.http.get('/api/contacts')
      .toPromise()
      .then((response: Response) => {
        const { contacts } = response.json();

        return contacts.map(buildContact);
      });
  }

  // TODO write specs
  get(id: number): Promise<Contact> {
    return this.http.get(`/api/contacts/${id}`)
      .toPromise()
      .then((response: Response) => {
        return buildContact(response.json());
      });
  }

}
