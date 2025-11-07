import type { Response, Request } from "express";
import * as userService from "./user.service";
import createHttpError from "http-errors";
import { createResponse } from "../../common/helper/response.helper";
import { generateToken, validPassword } from "../../services/jwt.services";

export const createUser = async (req: Request, res: Response) => {
  const { username, password, gmail } = req.body;
  const existUser = await userService.getUserByGmail(gmail);
  if (existUser) {
    throw createHttpError(402, "user with this gmail alreay exist !");
  }

  const result = await userService.createUser(req.body);
  res.send(createResponse(result, "User created succesfully"));
};

export const loginUser = async (req: Request, res: Response) => {
  const { gmail, password } = req.body;
  console.log(req.body);
  if (!gmail || !password) {
    throw createHttpError(400, "all flied required !");
  }

  const user = await userService.getUserByGmail(gmail);
  if (!user) {
    throw createHttpError(404, "user not found ");
  }
  const isValid = await validPassword(password, user.password);
  if (!isValid) {
    throw createHttpError(403, "credentials are not valid !");
  }

  const token = generateToken(user);
  const result = {
    user: user,
    token: token,
  };

  res.send(createResponse(result, "login sucess !"));
};
