import { createAction, props } from '@ngrx/store';
import { User } from '../user-profile/user-profile.component';

export const login = createAction(
  '[Auth] Login',
  props<{ user: User }>()
);

export const logout = createAction('[Auth] Logout');

export const updateUser = createAction(
  '[Auth] Update User',
  props<{ user: User }>()
);
