export class ConfirmationService {

  constructor(private window: Window) { }

  confirm(message: string): boolean {
    return this.window.confirm(message);
  }

}

export function confirmationServiceFactory(): ConfirmationService {
  return new ConfirmationService(window);
}
