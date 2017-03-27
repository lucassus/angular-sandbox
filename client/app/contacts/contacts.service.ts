import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Contact } from './contact';

@Injectable()
export class ContactsService {

  constructor(private http: Http) { }

  query(): Promise<Array<Contact>> {
    return this.http.get('/api/contacts')
      .toPromise()
      .then((response: Response) => {
        const { contacts } = response.json();

        return contacts.map(({ id, firstName, lastName, email, phone, updatedAt }) => {
          return new Contact(id, firstName, lastName, email, phone, updatedAt);
        });
      });
  }

}
