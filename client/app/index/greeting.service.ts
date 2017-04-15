import { Injectable } from '@angular/core';

@Injectable()
export class GreetingService {

  greet(name: string): string {
    return `Hello ${name}!`;
  }

}
