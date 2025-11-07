import  type { ErrorRespons } from "../helper/response.helper";
import type { ErrorRequestHandler } from "express";

const errorHandler : ErrorRequestHandler = ( err,req ,res , next)=>{
  const response : ErrorRespons ={
    sucess : false ,
    error_code : (err?.status ?? 500) as number,
    message : (err?.message ?? "Something Went wrong..") as string,
     data  : err?.data ?? {}
  }

  res.status(response.error_code).send(response);
  next();
}

export default errorHandler;