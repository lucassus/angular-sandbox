import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Config } from '../../config';
import { phoneValidator } from '../../phone-validator';
import { ICountry } from '../address';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit {

  @Input('contact') contact: Contact;
  @Output() onSubmit = new EventEmitter();

  countries: Array<ICountry>;

  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),
    phone: new FormControl('', phoneValidator),
    favourite: new FormControl(),

    address: new FormGroup({
      street: new FormControl(),
      town: new FormControl(),
      zipCode: new FormControl('', Validators.pattern(/^\d{2}-\d{3}$/)),
      countryCode: new FormControl()
    })
  });

  constructor(config: Config) {
    this.countries = config.countries;
  }

  ngOnInit(): void {
    const value = this.contact.toJS();
    this.contactForm.patchValue(value);
  }

  submit() {
    const { value: data } = this.contactForm;
    this.onSubmit.emit(data);
  }

}
