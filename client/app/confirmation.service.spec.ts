import { stub } from 'sinon';

import { ConfirmationService, WindowRefService } from './confirmation.service';

describe('WindowRefService', () => {

  let windowRef: WindowRefService;

  beforeEach(() => {
    windowRef = new WindowRefService();
  });

  describe('.nativeWindow', () => {

    it('returns native window', () => {
      expect(windowRef.nativeWindow).toBe(window);
    });

  });

});

describe('ConfirmationService', () => {

  let confirmationService: ConfirmationService;
  let fakeWindow;

  beforeEach(() => {
    fakeWindow = { confirm: stub() };
    confirmationService = new ConfirmationService({ nativeWindow: fakeWindow });
  });

  describe('.confirm', () => {

    it('opens the confirmation modal', () => {
      // Given
      fakeWindow.confirm.returns(true);

      // When
      const result = confirmationService.confirm('Are you sure?');

      // Then
      expect(fakeWindow.confirm.calledWith('Are you sure?')).toBeTruthy();
      expect(result).toBeTruthy();
    });

  });

});
