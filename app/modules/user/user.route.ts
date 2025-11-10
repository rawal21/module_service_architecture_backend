import { Router } from "express";
import * as userController  from "./user.controller"
import * as userValidation from "./user.validation"
import { catchError } from "../../common/middleware/catch-error.middleware";
import { loginLimiter } from "../../common/middleware/ratelimit.middleware";
const router = Router();


router.post("/" , userValidation.signup , catchError  ,userController.createUser);
router.post("/login" , loginLimiter , userValidation.login , catchError , userController.loginUser);


export default router ;