import {body , checkExact} from  "express-validator";

export const login = checkExact([
    body("gmail")
    .notEmpty()
    .withMessage("Email is required !")
    .isEmail()
    .withMessage("Email sahi se dall gwar "),
    body("password")
    .notEmpty()
    .withMessage("password is required ")
    .isString()
    .withMessage("password must be string")

])

export const signup = checkExact([
    body("username")
    .notEmpty()
    .withMessage("name is required ")
    .isString()
    .withMessage("NAME must be string"),
      body("gmail")
    .notEmpty()
    .withMessage("Email is required !")
    .isEmail()
    .withMessage("Email sahi se dall gwar "),
    body("password")
    .notEmpty()
    .withMessage("password is required ")
    .isString()
    .withMessage("password must be string")
])