import { resolveObjectURL } from "buffer";
import { BaseSchema } from "../../common/dto/base.dto";
import { IUser } from "./user.dto";
import UserSchema from "./user.schema"

export const createUser = async (data : Omit<IUser , "_id" | "createdAt" | "updatedAt">)=>{
    const result =  await UserSchema.create(data);
    const {password , ...user} = result.toJSON();
    return user ;
}

export const getUserByGmail = async ( gmail : string)=>{
    const user = await UserSchema.findOne({gmail})
    return user ;
}

