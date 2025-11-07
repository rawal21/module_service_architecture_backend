import { BaseSchema } from "../../common/dto/base.dto";
import { Types } from "mongoose";

export interface blogDto extends BaseSchema{
    title : string ,
    content : string ,
    slug : string ,
    author : Types.ObjectId | string ,
    tag? : string[],
    category? : string
}