import { IProfile } from 'app/shared/model/profile.model';

export interface IAddress {
  id?: number;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: string;
  street?: string;
  houseNr?: number;
  additional?: string;
  profile?: IProfile;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public country?: string,
    public state?: string,
    public city?: string,
    public zipCode?: string,
    public street?: string,
    public houseNr?: number,
    public additional?: string,
    public profile?: IProfile
  ) {}
}
