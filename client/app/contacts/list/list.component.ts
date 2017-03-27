import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Contact } from '../contact';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  contacts: Array<Contact>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(({ contacts }) => {
      this.contacts = contacts;
    });
  }

}
