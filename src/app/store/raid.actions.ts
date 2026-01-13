import { createAction, props } from '@ngrx/store';

export interface Raid {
  id: number;
  name: string;
  creator: string;
  theme: string;
  barName: string;
  maxAttendees: number;
  currentAttendees: number;
  date: Date;
}

export const joinRaid = createAction('[Raid] Join Raid', props<{ raid: Raid }>());

export const leaveRaid = createAction('[Raid] Leave Raid');

export const loadRaid = createAction('[Raid] Load Raid', props<{ raid: Raid }>());
