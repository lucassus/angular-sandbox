import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Contact } from '../contact';

@Component({
  selector: 'app-contacts-show',
  templateUrl: './show.component.html'
})
export class ShowComponent implements OnInit {

  contact: Contact;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ contact }) => {
      this.contact = contact;
    });
  }

}
