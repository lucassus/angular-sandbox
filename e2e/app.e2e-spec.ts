import { AngularSandboxPage } from './app.po';

describe('angular-sandbox App', () => {

  let page: AngularSandboxPage;

  beforeEach(() => {
    page = new AngularSandboxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
  });

});
