"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.login = void 0;
const express_validator_1 = require("express-validator");
exports.login = (0, express_validator_1.checkExact)([
    (0, express_validator_1.body)("gmail")
        .notEmpty()
        .withMessage("Email is required !")
        .isEmail()
        .withMessage("Email sahi se dall gwar "),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is required ")
        .isString()
        .withMessage("password must be string")
]);
exports.signup = (0, express_validator_1.checkExact)([
    (0, express_validator_1.body)("username")
        .notEmpty()
        .withMessage("name is required ")
        .isString()
        .withMessage("NAME must be string"),
    (0, express_validator_1.body)("gmail")
        .notEmpty()
        .withMessage("Email is required !")
        .isEmail()
        .withMessage("Email sahi se dall gwar "),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("password is required ")
        .isString()
        .withMessage("password must be string")
]);
