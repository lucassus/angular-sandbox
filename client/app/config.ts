import { Injectable } from '@angular/core';
import { Record } from 'immutable';

import { ICountry } from './contacts/address';

type Environment = 'production' | 'staging' | 'development' | 'test';

export interface IConfig {
  environment: Environment;
  countries: Array<ICountry>;
}

const ConfigRecord = Record<IConfig>({
  environment: 'development',
  countries: []
});

@Injectable()
export class Config extends ConfigRecord { }
