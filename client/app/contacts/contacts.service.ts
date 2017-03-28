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

  get(id: number): Promise<Contact> {
    return this.http.get(`/api/contacts/${id}`)
      .toPromise()
      .then((response: Response) => {
        return buildContact(response.json());
      });
  }

  // TODO write specs for this method
  create(data: any): Promise<Contact> {
    return this.http.post('/api/contacts', data)
      .toPromise()
      .then((response: Response) => {
        return buildContact(response.json());
      });
  }

  update(id: number, data: any): Promise<Contact> {
    return this.http.put(`/api/contacts/${id}`, data)
      .toPromise()
      .then((response: Response) => {
        return buildContact(response.json());
      });
  }

}
