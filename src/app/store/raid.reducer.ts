import { createReducer, on } from '@ngrx/store';
import * as RaidActions from './raid.actions';
import { Raid } from './raid.actions';

export interface RaidState {
  currentRaid: Raid | null;
}

export const initialState: RaidState = {
  currentRaid: null,
};

export const raidReducer = createReducer(
  initialState,
  on(RaidActions.joinRaid, (state, { raid }) => ({
    ...state,
    currentRaid: raid,
  })),
  on(RaidActions.leaveRaid, (state) => ({
    ...state,
    currentRaid: null,
  })),
  on(RaidActions.loadRaid, (state, { raid }) => ({
    ...state,
    currentRaid: raid,
  }))
);
