import { Injectable, ValueProvider } from '@angular/core';

@Injectable()
export class GreeterService {

  constructor(private prefix: string = 'Hello') { }

  greet(name: string): string {
    return `${this.prefix} ${name}!`;
  }

}

export function greeterWithPrefix(prefix: string): ValueProvider {
  return {
    provide: GreeterService,
    useValue: new GreeterService(prefix)
  }
}
