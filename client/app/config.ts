import { Injectable } from '@angular/core';
import { Record } from 'immutable';

import { ICountry } from './contacts/address';

type Environment = 'production' | 'staging' | 'development' | 'test';

const ConfigRecord = Record({
  environment: 'development',
  countries: []
});

@Injectable()
export class Config extends ConfigRecord {
  environment: Environment;
  countries: Array<ICountry>;
}
