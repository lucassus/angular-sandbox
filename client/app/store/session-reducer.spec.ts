import {
  SESSION_AUTHENTICATION_ERROR,
  SESSION_AUTHENTICATION_SUCCESS,
  SESSION_CLEAR_AUTHENTICATION_ERROR,
  SESSION_LOGOUT,
  SESSION_REQUEST_AUTHENTICATION
} from './session-actions';
import { session, SessionState } from './session-reducer';

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

    let newState: SessionState;

    beforeEach(() => {
      const state = new SessionState({
        authenticationPending: false
      });

      newState = session(state, { type: SESSION_REQUEST_AUTHENTICATION });
    });

    it('toggles `authenticationPending` flag', () => {
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

  describe(`${SESSION_AUTHENTICATION_ERROR} action`, () => {

    let newState: SessionState;

    beforeEach(() => {
      const state = new SessionState({
        authenticationPending: true,
        authenticated: true,
        authenticationError: false
      });

      newState = session(state, { type: SESSION_AUTHENTICATION_ERROR });
    });

    it('toggles `authenticationPending` flag', () => {
      expect(newState.authenticationPending).toBeFalsy();
    });

    it('toggles `authenticated` flag', () => {
      expect(newState.authenticated).toBeFalsy();
    });

    it('toggles `authenticationError` flag', () => {
      expect(newState.authenticationError).toBeTruthy();
    });

  });

  describe(`${SESSION_CLEAR_AUTHENTICATION_ERROR} action`, () => {

    let newState: SessionState;

    beforeEach(() => {
      const state = new SessionState({
        authenticationError: true
      });

      newState = session(state, { type: SESSION_CLEAR_AUTHENTICATION_ERROR });
    });

    it('toggles `authenticationError` flag', () => {
      expect(newState.authenticationError).toBeFalsy();
    });

  });

  describe(`${SESSION_LOGOUT} action`, () => {

    let newState: SessionState;

    beforeEach(() => {
      const state = new SessionState({
        authenticated: true
      });

      newState = session(state, { type: SESSION_LOGOUT });
    });

    it('toggles `authenticated` flag', () => {
      expect(newState.authenticated).toBeFalsy();
    });

  });

});
