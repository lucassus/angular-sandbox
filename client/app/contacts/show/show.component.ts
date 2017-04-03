import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Contact } from '../contact';
import { Config } from '../../config';
import { ICountry } from '../address';

@Component({
  selector: 'app-contacts-show',
  templateUrl: './show.component.html'
})
export class ShowComponent implements OnInit {

  countries: Array<ICountry>;
  contact: Contact;

  constructor(private route: ActivatedRoute, config: Config) {
    this.countries = config.countries;
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ contact }) => {
      this.contact = contact;
    });
  }

  // TODO create a pipe
  getCountryNameFor(code: string): string {
    const country = this.countries.find((c) => c.code === code);
    return country && country.name;
  }

}
