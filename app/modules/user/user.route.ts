import { Router } from "express";
import * as userController  from "./user.controller"
import * as userValidation from "./user.validation"
import { catchError } from "../../common/middleware/catch-error.middleware";
const router = Router();


router.post("/" , userValidation.signup , catchError  ,userController.createUser);
router.post("/login" , userValidation.login , catchError , userController.loginUser);


export default router ;