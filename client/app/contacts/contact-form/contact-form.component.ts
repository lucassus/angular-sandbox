import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Config } from '../../config';
import { phoneValidator } from '../../phone-validator';
import { ICountry } from '../address';
import { Contact } from '../contact';
import { UniqueEmailValidator } from './unique-email-validator';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  providers: [UniqueEmailValidator]
})
export class ContactFormComponent implements OnInit {

  @Input() remotePending: boolean;
  @Input() contact: Contact;

  @Output() onChange = new EventEmitter();
  @Output() onSubmit = new EventEmitter();

  contactForm: FormGroup;

  countries: Array<ICountry>;

  constructor(
    private config: Config,
    private fb: FormBuilder,
    private uniqueEmailValidator: UniqueEmailValidator
  ) { }

  ngOnInit(): void {
    const { countries } = this.config;
    this.countries = countries;

    this.contactForm = this.fb.group({
      id: this.contact.id,

      firstName: [this.contact.firstName, Validators.required],
      lastName: [this.contact.lastName, Validators.required],
      email: [this.contact.email, Validators.compose([
        Validators.required,
        Validators.email
      ]), this.uniqueEmailValidator.createValidator(this.contact)],
      phone: [this.contact.phone, phoneValidator],
      favourite: this.contact.favourite,

      address: this.fb.group({
        street: this.contact.address.street,
        town: this.contact.address.town,
        zipCode: [this.contact.address.zipCode, Validators.pattern(/^\d{2}-\d{3}$/)],
        countryCode: this.contact.address.countryCode
      })
    });

    this.contactForm.valueChanges.subscribe((values) => {
      this.onChange.emit(values);
    });
  }

  submit() {
    const { value: data } = this.contactForm;
    this.onSubmit.emit(data);
  }

}
