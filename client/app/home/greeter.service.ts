import { Injectable } from '@angular/core';

@Injectable()
export class GreeterService {

  constructor(private prefix: string = 'Hello') { }

  greet(name: string): string {
    return `${this.prefix} ${name}!`;
  }

}
