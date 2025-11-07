import mongoose from "mongoose";
import bcrypt from  "bcrypt";
import type { IUser } from "./user.dto";

const schema =  mongoose.Schema;

export const hashPassword = async (password : string) =>{
    const hash = await bcrypt.hash(password  , 10);
    return hash;
}

const  UserSchema = new schema<IUser> ({
   
    username : { type : String , required :  true},
    password : {type : String ,  required :  true },
    gmail : { type : String , required : true},
    role : {type :  String , enum : ["User" , "Admin"] , default : 'User'}
} , 
{timestamps :  true }
);

UserSchema.pre('save' , async function(next){
     if(this.password)
     {
        this.password = await hashPassword(this.password);
     }
     next();
});

export default mongoose.model<IUser>("User" , UserSchema);