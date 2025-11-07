import { body, checkExact } from "express-validator";
import mongoose from "mongoose";

// ✅ Validator for creating a blog post
export const createBlog = checkExact([
  body("title")
    .notEmpty()
    .withMessage("Title is required!")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3 })
    .withMessage("Title must contain at least 3 characters"),

  body("content")
    .notEmpty()
    .withMessage("Content is required!")
    .isString()
    .withMessage("Content must be a string")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters"),

  body("slug")
    .notEmpty()
    .withMessage("Slug is required!")
    .isString()
    .withMessage("Slug must be a string"),

  body("author")
    .notEmpty()
    .withMessage("Author is required!")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid author ID");
      }
      return true;
    }),

  body("tag")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
    .custom((arr) => arr.every((t: any) => typeof t === "string"))
    .withMessage("Each tag must be a string"),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),
]);

// ✅ Validator for updating a blog post
export const updateBlog = checkExact([
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string"),

  body("content")
    .optional()
    .isString()
    .withMessage("Content must be a string"),

  body("slug")
    .optional()
    .isString()
    .withMessage("Slug must be a string"),

  body("tag")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
    .custom((arr) => arr.every((t: any) => typeof t === "string"))
    .withMessage("Each tag must be a string"),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),
]);
