import { Record } from 'immutable';

export interface ISessionState {
  authenticationPending: boolean;
  authenticationError: boolean;
  authenticated: boolean;
}

export const SessionRecord = Record<ISessionState>({
  authenticationPending: false,
  authenticated: false,
  authenticationError: false
});

export class SessionState extends SessionRecord {

}

export const DEFAULT_SESSION_STATE = new SessionState();
