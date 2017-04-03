import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

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
    ]), this.uniqueEmailValidator),
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

  private uniqueEmailValidator(control: AbstractControl): Promise<ValidationErrors> {
    const { value: email } = control;

    return new Promise((resolve) => {
      if (email === 'taken@email.com') {
        resolve({ uniqueEmail: { valid: false } });
      } else {
        resolve(null);
      }
    });
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
