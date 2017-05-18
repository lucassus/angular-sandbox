import { session, SessionState } from './session-reducer';
import { SESSION_REQUEST_AUTHENTICATION, SESSION_AUTHENTICATION_SUCCESS } from './session-actions';

describe('session', () => {

  describe('for invalid action', () => {

    it('returns the current state', () => {
      // Given
      const state = new SessionState({
        authenticated: true
      });

      // When
      const newState = session(state, { type: 'INVALID_ACTION' });

      // Then
      expect(state === newState).toBeTruthy();
    });

  });

  describe(`${SESSION_REQUEST_AUTHENTICATION} action`, () => {

    it('toggles `authenticationPending` flag', () => {
      // Given
      const state = new SessionState({ authenticationPending: false });

      // When
      const newState = session(state, { type: SESSION_REQUEST_AUTHENTICATION });

      // Then
      expect(newState.authenticationPending).toBeTruthy();
    });

  });

  describe(`${SESSION_AUTHENTICATION_SUCCESS} action`, () => {

    let newState: SessionState;

    beforeEach(() => {
      const state = new SessionState({
        authenticationPending: true,
        authenticated: false,
        authenticationError: true
      });

      newState = session(state, { type: SESSION_AUTHENTICATION_SUCCESS });
    });

    it('toggles `authenticationPending` flag', () => {
      expect(newState.authenticationPending).toBeFalsy();
    });

    it('toggles `authenticated` flag', () => {
      expect(newState.authenticated).toBeTruthy();
    });

    it('toggles `authenticationError` flag', () => {
      expect(newState.authenticationError).toBeFalsy();
    });

  });

});
