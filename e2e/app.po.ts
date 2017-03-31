import { browser } from 'protractor';

export class AngularSandboxPage {

  navigateTo() {
    return browser.get('/');
  }

}
