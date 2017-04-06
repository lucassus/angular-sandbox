import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { List } from 'immutable';

import { Contact } from './contact';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactsService {

  constructor(private http: Http) { }

  query(): Promise<List<Contact>> {
    return this.http.get('/api/contacts')
      .toPromise()
      .then((response: Response) => {
        const { contacts } = response.json();
        return List(contacts.map((params) => new Contact(params)));
      });
  }

  get(id: number): Promise<Contact> {
    return this.http.get(`/api/contacts/${id}`)
      .toPromise()
      .then((response: Response) => {
        return new Contact(response.json());
      });
  }

  create(contact: Contact): Promise<Contact> {
    return this.http.post('/api/contacts', contact.toJS())
      .toPromise()
      .then((response: Response) => {
        return contact.mergeDeep(response.json());
      });
  }

  update(contact: Contact): Promise<Contact> {
    return this.http.put(`/api/contacts/${contact.id}`, contact.toJS())
      .toPromise()
      .then((response: Response) => {
        return contact.mergeDeep(response.json());
      });
  }

  checkEmailUniqueness(id: number, email: string): Observable<{ email: string, taken: Boolean }> {
    const params = { id, email };
    return this.http.get('/api/contacts/validate-email', { params })
      .map((response: Response) => {
        const { taken } = response.json();
        return { email, taken };
      });
  }

}
