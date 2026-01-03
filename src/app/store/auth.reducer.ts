import { createReducer, on } from '@ngrx/store';
import { User } from '../user-profile/user-profile.component';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
  })),
  on(AuthActions.updateUser, (state, { user }) => ({
    ...state,
    user,
  }))
);
