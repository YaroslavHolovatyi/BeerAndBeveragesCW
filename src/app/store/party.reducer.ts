import { createReducer, on } from '@ngrx/store';
import * as PartyActions from './party.actions';
import { DungeonParty } from './party.actions';

export interface PartyState {
  currentParty: DungeonParty | null;
}

export const initialState: PartyState = {
  currentParty: null,
};

export const partyReducer = createReducer(
  initialState,
  on(PartyActions.createParty, (state, { party }) => ({
    ...state,
    currentParty: party,
  })),
  on(PartyActions.dismissParty, (state) => ({
    ...state,
    currentParty: null,
  })),
  on(PartyActions.loadParty, (state, { party }) => ({
    ...state,
    currentParty: party,
  }))
);
