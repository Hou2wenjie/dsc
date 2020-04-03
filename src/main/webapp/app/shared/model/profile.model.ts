import { IUser } from 'app/core/user/user.model';
import { IAddress } from 'app/shared/model/address.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IProfile {
  id?: number;
  name?: string;
  gender?: Gender;
  age?: number;
  phoneNr?: string;
  resemeContentType?: string;
  reseme?: any;
  user?: IUser;
  address?: IAddress;
}

export class Profile implements IProfile {
  constructor(
    public id?: number,
    public name?: string,
    public gender?: Gender,
    public age?: number,
    public phoneNr?: string,
    public resemeContentType?: string,
    public reseme?: any,
    public user?: IUser,
    public address?: IAddress
  ) {}
}
