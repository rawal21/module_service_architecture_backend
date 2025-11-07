"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController = __importStar(require("./blog.controller"));
const auth_middleware_1 = require("../../common/middleware/auth.middleware");
const blog_validations_1 = require("./blog.validations");
const catch_error_middleware_1 = require("../../common/middleware/catch-error.middleware");
const cache_middleware_1 = require("../../common/middleware/cache.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.auth, blog_validations_1.createBlog, catch_error_middleware_1.catchError, blogController.createPost);
// ✅ Cache for post list with pagination + search support
router.get("/", auth_middleware_1.auth, (0, cache_middleware_1.cache)((req) => {
    var _a, _b, _c;
    const page = (_a = req.query.page) !== null && _a !== void 0 ? _a : 1;
    const limit = (_b = req.query.limit) !== null && _b !== void 0 ? _b : 5;
    const search = (_c = req.query.search) !== null && _c !== void 0 ? _c : "";
    return `posts_${page}_${limit}_${search}`;
}, 120), blogController.fetchPost);
// ✅ Cache for single post by slug
router.get("/:slug", auth_middleware_1.auth, (0, cache_middleware_1.cache)((req) => `post_${req.params.slug}`, 300), blogController.fetchBySlug);
// router.delete("/:slug", auth, blogController.deletePost);
exports.default = router;
