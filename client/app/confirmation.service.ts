import { Injectable } from '@angular/core';

// TODO find better solution for injecting `window`
@Injectable()
export class WindowRefService {
  get nativeWindow(): any {
    return window;
  }
}

@Injectable()
export class ConfirmationService {

  private window: Window;

  constructor(windowRef: WindowRefService) {
    this.window = windowRef.nativeWindow;
  }

  confirm(message: string): boolean {
    return this.window.confirm(message);
  }

}
