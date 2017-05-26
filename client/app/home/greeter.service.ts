import { FactoryProvider } from '@angular/core';

export class GreeterService {

  constructor(private prefix: string = 'Hello') { }

  greet(name: string): string {
    return `${this.prefix} ${name}!`;
  }

}

export function provideGreeterService(prefix: string): FactoryProvider {
  return {
    provide: GreeterService,
    useFactory() {
      return new GreeterService(prefix);
    }
  };
}
