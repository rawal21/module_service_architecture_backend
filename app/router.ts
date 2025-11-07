import express from "express";
import userRoutes from "./modules/user/user.route"
import blogRoute from "./modules/blog/blog.route"

const router = express.Router();

router.use("/user" , userRoutes);
router.use("/blog" , blogRoute);


export default router;