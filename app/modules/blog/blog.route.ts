import { Router } from "express";
import * as blogController from "./blog.controller";
import { auth } from "../../common/middleware/auth.middleware";
import { createBlog } from "./blog.validations";
import { catchError } from "../../common/middleware/catch-error.middleware";
import { cache } from "../../common/middleware/cache.middleware";

const router = Router();

router.post("/", auth, createBlog, catchError, blogController.createPost);

// ✅ Cache for post list with pagination + search support
router.get(
  "/",
  auth,
  cache(
    (req: any) => {
      const page = req.query.page ?? 1;
      const limit = req.query.limit ?? 5;
      const search = req.query.search ?? "";
      return `posts_${page}_${limit}_${search}`;
    },
    120
  ),
  blogController.fetchPost
);

// ✅ Cache for single post by slug
router.get(
  "/:slug",
  auth,
  cache((req: any) => `post_${req.params.slug}`, 300),
  blogController.fetchBySlug
);

// router.delete("/:slug", auth, blogController.deletePost);

export default router;
