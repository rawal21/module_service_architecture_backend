"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlog = exports.createBlog = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
// ✅ Validator for creating a blog post
exports.createBlog = (0, express_validator_1.checkExact)([
    (0, express_validator_1.body)("title")
        .notEmpty()
        .withMessage("Title is required!")
        .isString()
        .withMessage("Title must be a string")
        .isLength({ min: 3 })
        .withMessage("Title must contain at least 3 characters"),
    (0, express_validator_1.body)("content")
        .notEmpty()
        .withMessage("Content is required!")
        .isString()
        .withMessage("Content must be a string")
        .isLength({ min: 10 })
        .withMessage("Content must be at least 10 characters"),
    (0, express_validator_1.body)("slug")
        .notEmpty()
        .withMessage("Slug is required!")
        .isString()
        .withMessage("Slug must be a string"),
    (0, express_validator_1.body)("author")
        .notEmpty()
        .withMessage("Author is required!")
        .custom((value) => {
        if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
            throw new Error("Invalid author ID");
        }
        return true;
    }),
    (0, express_validator_1.body)("tag")
        .optional()
        .isArray()
        .withMessage("Tags must be an array")
        .custom((arr) => arr.every((t) => typeof t === "string"))
        .withMessage("Each tag must be a string"),
    (0, express_validator_1.body)("category")
        .optional()
        .isString()
        .withMessage("Category must be a string"),
]);
// ✅ Validator for updating a blog post
exports.updateBlog = (0, express_validator_1.checkExact)([
    (0, express_validator_1.body)("title")
        .optional()
        .isString()
        .withMessage("Title must be a string"),
    (0, express_validator_1.body)("content")
        .optional()
        .isString()
        .withMessage("Content must be a string"),
    (0, express_validator_1.body)("slug")
        .optional()
        .isString()
        .withMessage("Slug must be a string"),
    (0, express_validator_1.body)("tag")
        .optional()
        .isArray()
        .withMessage("Tags must be an array")
        .custom((arr) => arr.every((t) => typeof t === "string"))
        .withMessage("Each tag must be a string"),
    (0, express_validator_1.body)("category")
        .optional()
        .isString()
        .withMessage("Category must be a string"),
]);
