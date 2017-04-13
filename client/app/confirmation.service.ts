import { Inject, Injectable } from '@angular/core';

@Injectable()
export class ConfirmationService {

  constructor(
    @Inject('window') private window: Window
  ) { }

  confirm(message: string): boolean {
    return this.window.confirm(message);
  }

}
