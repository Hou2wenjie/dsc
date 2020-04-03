import { Moment } from 'moment';
import { IProfile } from 'app/shared/model/profile.model';
import { IRound } from 'app/shared/model/round.model';
import { State } from 'app/shared/model/enumerations/state.model';

export interface IApplication {
  id?: number;
  state?: State;
  end?: Moment;
  lastChanged?: Moment;
  profile?: IProfile;
  round?: IRound;
}

export class Application implements IApplication {
  constructor(
    public id?: number,
    public state?: State,
    public end?: Moment,
    public lastChanged?: Moment,
    public profile?: IProfile,
    public round?: IRound
  ) {}
}
