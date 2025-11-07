"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.fetchBySlug = exports.fetchPost = exports.createPost = void 0;
const blog_schema_1 = __importDefault(require("./blog.schema"));
const http_errors_1 = __importDefault(require("http-errors"));
const redis_services_1 = require("../../services/redis.services");
const createPost = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = data.title.toLowerCase().replace(/\s+/g, "-");
    const newPost = yield blog_schema_1.default.create(Object.assign(Object.assign({}, data), { slug: slug, author: user.id }));
    // ✅ Invalidate caches
    yield redis_services_1.redisService.del("all_posts");
    yield redis_services_1.redisService.del(`post_${slug}`);
    return newPost;
});
exports.createPost = createPost;
const fetchPost = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 5, search = "" } = query;
    const posts = yield blog_schema_1.default
        .find({ title: { $regex: search, $options: "i" } })
        .populate("author", "name email role")
        .skip((page - 1) * Number(limit))
        .limit(Number(limit))
        .exec();
    return posts;
});
exports.fetchPost = fetchPost;
const fetchBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blog_schema_1.default.findOne({ slug });
});
exports.fetchBySlug = fetchBySlug;
const deletePost = (slug, user) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield blog_schema_1.default.findOne({ slug });
    if (!post) {
        throw (0, http_errors_1.default)(404, "Post not found");
    }
    if (user.role !== "admin" && post.author.toString() !== user.userId) {
        throw (0, http_errors_1.default)(403, "Unauthorized");
    }
    const result = yield post.deleteOne();
    // ✅ Invalidate caches
    yield redis_services_1.redisService.del("all_posts");
    yield redis_services_1.redisService.del(`post_${slug}`);
    return result;
});
exports.deletePost = deletePost;
