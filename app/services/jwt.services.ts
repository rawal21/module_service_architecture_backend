import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import type { IUser } from "../modules/user/user.dto";

export const validPassword = async (value: string, password: string) => {
  const campare = await bcrypt.compare(value, password);
  return campare;
};

export const generateToken = (user  : IUser):string  =>{
    const payload = {
        _id : user._id , 
        username: user.username,
        gmail : user.gmail
    }

    const token = jwt.sign(payload , process.env.JWT as string , {
        expiresIn : '7d'
    });

    return token ;
}
