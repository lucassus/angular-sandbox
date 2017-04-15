import { GreeterService } from './greeter.service';

describe('GreeterService', () => {

  let greeting: GreeterService;

  beforeEach(() => {
    greeting = new GreeterService();
  });

  describe('.greet', () => {

    it('says "Hello" to someone', () => {
      expect(greeting.greet('Luke')).toEqual('Hello Luke!');
    });

  });

});
