import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

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
    id: new FormControl(),
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

  constructor(
    private config: Config,
    private contactsService: ContactsService
  ) { }

  ngOnInit(): void {
    const { countries } = this.config;
    this.countries = countries;

    const value = this.contact.toJS();
    this.contactForm.patchValue(value);

    this.uniqueEmailValidator(this.contactForm.get('email'));
  }

  // TODO block form submission until the control is validated
  // TODO refactor
  private uniqueEmailValidator(control: AbstractControl): void {
     const { value: id } = control.root.get('id');

    control.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((email: string) => {
        return this.contactsService.checkEmailUniqueness(id, email);
      })
      .subscribe(({ email, taken }) => {
        if (taken) {
          control.setErrors({ emailTaken: email });
        }
      });
  }

  submit() {
    const { value: data } = this.contactForm;
    this.onSubmit.emit(data);
  }

}
