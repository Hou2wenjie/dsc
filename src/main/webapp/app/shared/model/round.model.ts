import { Moment } from 'moment';

export interface IRound {
  id?: number;
  startTime?: Moment;
  endTime?: Moment;
  maxCap?: number;
  currentCap?: number;
}

export class Round implements IRound {
  constructor(public id?: number, public startTime?: Moment, public endTime?: Moment, public maxCap?: number, public currentCap?: number) {}
}
