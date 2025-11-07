
import { Request, Response, NextFunction } from "express";
import * as blogService from "./blog.service";
import { createResponse } from "../../common/helper/response.helper";
import asyncHandler from "express-async-handler"

export const createPost = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("debug req.user =", req.user);

    const result = await blogService.createPost(req.body, req.user);

    res.send(createResponse(result, "Post created successfully"));
  }
)

export const fetchPost = asyncHandler(
    async (req : Request , res : Response)=>{
     const result = await blogService.fetchPost(req.query);
     res.send(createResponse(result , "Fetch sucess"))
    
    }
)

export const fetchBySlug = asyncHandler(
    async (req : Request , res : Response)=>{
        const  result = await blogService.fetchBySlug(req.params.slug)
        res.send(createResponse(result , "fetch sucesss "))
    }
)

// export const  deletePost = asyncHandler(
//  async (req : Request , res : Response)=>{
//      const result = blogService.deletePost(req.params.slug , req.user);
//      res.send(createResponse(result , "delete sucess"));
//  }
// )
