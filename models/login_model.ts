"user strict";

import {IUser} from "./user_model";

export interface ILogin {
    email:string;
    password:string;
    user:IUser;
    token:string;
    expiration: Date;
};
