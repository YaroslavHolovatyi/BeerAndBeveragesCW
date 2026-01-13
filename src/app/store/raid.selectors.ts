import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RaidState } from './raid.reducer';

export const selectRaidState = createFeatureSelector<RaidState>('raid');

export const selectCurrentRaid = createSelector(
  selectRaidState,
  (state: RaidState) => state.currentRaid
);

export const selectIsInRaid = createSelector(selectCurrentRaid, (raid) => raid !== null);
