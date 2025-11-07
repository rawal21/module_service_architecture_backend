import blogSchema from "./blog.schema";
import { blogDto } from "./blog.dto";
import createHttpError from "http-errors";
import { redisService } from "../../services/redis.services";

export const createPost = async (
  data: Omit<blogDto, "author" | "_id" | "createdAt" | "updatedAt">,
  user: any
) => {
  const slug = data.title.toLowerCase().replace(/\s+/g, "-");

  const newPost = await blogSchema.create({
    ...data,
    slug: slug,
    author: user.id,
  });

  // ✅ Invalidate caches
  await redisService.del("all_posts");
  await redisService.del(`post_${slug}`);

  return newPost;
};

export const fetchPost = async (query: any) => {
  const { page = 1, limit = 5, search = "" } = query;

  const posts = await blogSchema
    .find({ title: { $regex: search, $options: "i" } })
    .populate("author", "name email role")
    .skip((page - 1) * Number(limit))
    .limit(Number(limit))
    .exec();

  return posts;
};

export const fetchBySlug = async (slug: string) => {
  return await blogSchema.findOne({ slug });
};

export const deletePost = async (slug: string, user: any) => {
  const post = await blogSchema.findOne({ slug });

  if (!post) {
    throw createHttpError(404, "Post not found");
  }

  if (user.role !== "admin" && post.author.toString() !== user.userId) {
    throw createHttpError(403, "Unauthorized");
  }

  const result = await post.deleteOne();

  // ✅ Invalidate caches
  await redisService.del("all_posts");
  await redisService.del(`post_${slug}`);

  return result;
};
