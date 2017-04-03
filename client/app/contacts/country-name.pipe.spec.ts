import { Config } from 'app/config';
import { CountryNamePipe } from './country-name.pipe';

describe('CountryNamePipe', () => {

  let pipe: CountryNamePipe;

  beforeEach(() => {
    const countries = [
      { code: 'PL', name: 'Poland' },
      { code: 'UK', name: 'United Kingdom' }
    ];
    const config = new Config({ countries });

    pipe = new CountryNamePipe(config);
  });

  describe('when the country exists', () => {

    it('returns valid country code', () => {
      expect(pipe.transform('PL')).toEqual('Poland');
      expect(pipe.transform('UK')).toEqual('United Kingdom');
    });

  });

  describe('when the country does not exist', () => {

    it('returns undefined', () => {
      expect(pipe.transform('XX')).toBeUndefined();
    });

  });

});
