import { Router } from "express";
import { cloudinaryUpload } from "../utils/cloudinary";
import postController from "../controllers/postController";

const router = Router();

router.get("/posts/", postController.getAll);
router.get("/posts/:id", postController.getById);
router.post(
	"/posts/",
	cloudinaryUpload.array("photos", 12),
	postController.create
);
router.put("/posts/", postController.update);
router.delete("/posts/", postController._delete);
router.put("/posts/:id/like", postController.like);
router.put("/posts/:id/unlike", postController.unlike);

router.get("/user/:id/posts", postController.getUserPosts);

export default router;
