import { CheckmarkPipe } from './checkmark.pipe';

describe('CheckmarkPipe', () => {

  let pipe: CheckmarkPipe;

  beforeEach(() => {
    pipe = new CheckmarkPipe();
  });

  it('returns a checkmark', () => {
    expect(pipe.transform(true)).toEqual('✓');
    expect(pipe.transform(false)).toEqual('✘');
  });

});
