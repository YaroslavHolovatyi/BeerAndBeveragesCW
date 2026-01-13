import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PartyState } from './party.reducer';

export const selectPartyState = createFeatureSelector<PartyState>('party');

export const selectCurrentParty = createSelector(
  selectPartyState,
  (state: PartyState) => state.currentParty
);

export const selectIsInParty = createSelector(selectCurrentParty, (party) => party !== null);

export const selectPartyMembers = createSelector(
  selectCurrentParty,
  (party) => party?.members || []
);

export const isUserInParty = (userId: number) =>
  createSelector(selectPartyMembers, (members) => members.some((member) => member.id === userId));
