import * as Promise from 'bluebird';
import * as faker from 'faker';
import * as _ from 'lodash';

import { Collection } from './collection';

faker.locale = 'pl';

const EMAILS = [
  'luke@rebel.org',
  'vader@empire.gov',
  'taken@email.com'
];

export class Db {

  contacts = new Collection();

  seed(n = 20) {
    faker.seed(667);

    return this.drop().then(() => {
      return Promise.all(_.times(n, (i) => {
        const email = EMAILS[i] || faker.internet.email();

        const address = {
          countryCode: faker.address.countryCode(),
          town: faker.address.city(),
          zipCode: faker.address.zipCode(),
          street: faker.address.streetAddress(),
          location: {
            lon: faker.address.longitude(),
            lat: faker.address.latitude()
          }
        };

        return this.contacts.insertOne({
          favourite: faker.random.boolean(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email,
          phone: faker.phone.phoneNumber(),
          address
        });
      }));
    });
  }

  drop() {
    return Promise.all([
      this.contacts.drop()
    ]);
  }

}

export const db = new Db();
