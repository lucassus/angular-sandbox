import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Config } from '../../config';
import { phoneValidator } from '../../phone-validator';
import { ICountry } from '../address';
import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';
import { UniqueEmailValidator } from './unique-email-validator';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit {

  @Input('contact') contact: Contact;
  @Output() onSubmit = new EventEmitter();

  contactForm: FormGroup;

  countries: Array<ICountry>;

  constructor(
    private config: Config,
    private contactsService: ContactsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const { countries } = this.config;
    this.countries = countries;

    this.contactForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    // TODO pass it as a service (stub and test in isolation)
    const uniqueEmailValidator = new UniqueEmailValidator(this.contact, this.contactsService);

    return this.fb.group({
      id: this.contact.id,

      firstName: [this.contact.firstName, Validators.required],
      lastName: [this.contact.lastName, Validators.required],
      email: [this.contact.email, Validators.compose([
        Validators.required,
        Validators.email
      ]), uniqueEmailValidator.validate.bind(uniqueEmailValidator)],
      phone: [this.contact.phone, phoneValidator],
      favourite: this.contact.favourite,

      address: this.fb.group({
        street: this.contact.address.street,
        town: this.contact.address.town,
        zipCode: [this.contact.address.zipCode, Validators.pattern(/^\d{2}-\d{3}$/)],
        countryCode: this.contact.address.countryCode
      })
    });
  }

  submit() {
    const { value: data } = this.contactForm;
    this.onSubmit.emit(data);
  }

}
