import { BaseSchema } from "../../common/dto/base.dto";

export interface IUser extends BaseSchema {
    username : string ,
    gmail : string ,
    password : string ,
    role :  string
}