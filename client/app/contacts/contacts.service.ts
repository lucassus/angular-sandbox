import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { List } from 'immutable';

import { Contact } from './contact';

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

  create(data: any): Promise<Contact> {
    return this.http.post('/api/contacts', data)
      .toPromise()
      .then((response: Response) => {
        return new Contact(response.json());
      });
  }

  update(id: number, data: any): Promise<Contact> {
    return this.http.put(`/api/contacts/${id}`, data)
      .toPromise()
      .then((response: Response) => {
        return new Contact(response.json());
      });
  }

}
