import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationEffectService } from './authentication-effect.service';

describe('AuthenticationEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationEffectService]
    });
  });

  it('should be created', inject([AuthenticationEffectService], (service: AuthenticationEffectService) => {
    expect(service).toBeTruthy();
  }));
});
