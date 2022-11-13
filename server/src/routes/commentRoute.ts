import { Router } from "express";
import { cloudinaryUpload } from "../utils/cloudinary";
import commentController from "../controllers/commentController";
const router = Router();

router.get("/comments/", commentController.getAll);
router.get("/comments/:id", commentController.getById);
router.get("/posts/:id/comments/", commentController.getPostsComments);
router.get("/user/:id/comments/", commentController.getUsersComments);

router.post(
	"/comments/",
	cloudinaryUpload.single("photo"),
	commentController.create
);
router.put("/comments/", commentController.update);
router.delete("/comments/", commentController._delete);
router.put("/comments/", commentController.like);
router.put("/comments/", commentController.unlike);

export default router;
