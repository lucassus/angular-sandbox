import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { Config } from '../../config';
import { phoneValidator } from '../../phone-validator';
import { ICountry } from '../address';
import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

// TODO move to the separate file
// TODO write specs
class UniqueEmailValidator {

  private validatorInput = new Subject<{ id: number, email: string }>();
  private validatorChain: Observable<ValidationErrors | null>;

  // TODO pass a generic function
  constructor(private contactsService: ContactsService) {
    this.validatorChain = this.validatorInput
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(({ id, email }) => {
        return this.contactsService.checkEmailUniqueness(id, email);
      })
      .map(({ email, taken }) => {
        if (taken) {
          return { emailTaken: email };
        }

        return null;
      })
      .share()
      .take(1);
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const { value: id } = control.root.get('id');
    const { value: email } = control;

    console.log(this);

    setTimeout(() => {
      this.validatorInput.next({ id, email });
    });

    return this.validatorChain;
  }

}

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
    contactsService: ContactsService,
  ) {
    // TODO consider use FormBuilder
    const validator = new UniqueEmailValidator(contactsService);

    this.contactForm = new FormGroup({
      id: new FormControl(),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ]), validator.validate.bind(validator)),
      phone: new FormControl('', phoneValidator),
      favourite: new FormControl(),

      address: new FormGroup({
        street: new FormControl(),
        town: new FormControl(),
        zipCode: new FormControl('', Validators.pattern(/^\d{2}-\d{3}$/)),
        countryCode: new FormControl()
      })
    });
  }

  ngOnInit(): void {
    const { countries } = this.config;
    this.countries = countries;

    const value = this.contact.toJS();
    this.contactForm.patchValue(value);
  }

  submit() {
    const { value: data } = this.contactForm;
    this.onSubmit.emit(data);
  }

}
