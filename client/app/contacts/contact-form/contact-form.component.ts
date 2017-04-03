import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { Config } from '../../config';
import { phoneValidator } from '../../phone-validator';
import { ICountry } from '../address';
import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

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
    ]), this.uniqueEmailValidator.bind(this)),
    phone: new FormControl('', phoneValidator),
    favourite: new FormControl(),

    address: new FormGroup({
      street: new FormControl(),
      town: new FormControl(),
      zipCode: new FormControl('', Validators.pattern(/^\d{2}-\d{3}$/)),
      countryCode: new FormControl()
    })
  });

  constructor(
    private config: Config,
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    const { countries } = this.config;
    this.countries = countries;

    const value = this.contact.toJS();
    this.contactForm.patchValue(value);
  }

  // TODO debounce
  private uniqueEmailValidator(control: AbstractControl): Promise<ValidationErrors> {
    const { id } = this.contact;
    const { value: email } = control;

    return this.contactsService.checkEmailUniqueness(id, email)
      .then((taken) => {
        console.log('Taken', taken);

        if (taken) {
          return { uniqueEmail: { valid: false } };
        } else {
          return null;
        }
      });
  }

  submit() {
    const { value: data } = this.contactForm;
    this.onSubmit.emit(data);
  }

}
