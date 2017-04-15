import { GreetingService } from './greeting.service';

describe('GreetingService', () => {

  let greeting: GreetingService;

  beforeEach(() => {
    greeting = new GreetingService();
  });

  describe('.greet', () => {

    it('says "Hello" to someone', () => {
      expect(greeting.greet('Luke')).toEqual('Hello Luke!');
    });

  });

});
