import { createAction, props } from '@ngrx/store';

export interface Friend {
  id: number;
  firstName: string;
  lastName: string;
  nickname?: string;
  profileImage?: string;
  race?: string;
}

export interface DungeonParty {
  name: string;
  time: string;
  members: Friend[];
  createdAt: Date;
}

export const createParty = createAction('[Party] Create Party', props<{ party: DungeonParty }>());

export const dismissParty = createAction('[Party] Dismiss Party');

export const loadParty = createAction('[Party] Load Party', props<{ party: DungeonParty }>());
