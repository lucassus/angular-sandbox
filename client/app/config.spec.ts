import { Config } from './config';

describe('Config', () => {

  it('can be initialized with default values', () => {
    const config = new Config({ environment: 'staging' });

    expect(config.environment).toEqual('staging');
    expect(config.countries.length).toEqual(0);
  });

});
