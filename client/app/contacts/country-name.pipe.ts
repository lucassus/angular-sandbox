import { Pipe, PipeTransform } from '@angular/core';

import { Config } from '../config';
import { ICountry } from './address';

@Pipe({
  name: 'countryName'
})
export class CountryNamePipe implements PipeTransform {

  countries: Array<ICountry>;

  constructor(config: Config) {
    this.countries = config.countries;
  }

  transform(code: string): string|undefined {
    const country = this.countries.find((c) => c.code === code);
    return country && country.name;
  }

}
