/* title, content, user_id, likes, upvotes, tags, comments,  */
import { Schema, model, Types, ObjectId } from "mongoose";

export interface IPost {
	user_id: ObjectId;
	title: string;
	content: string;
	photos: string[];
	likes: Types.ObjectId[];
	comments: Types.ObjectId[];
}

const postSchema = new Schema<IPost>({
	user_id: {
		type: Types.ObjectId,
		ref: "User",
	},
	title: { type: String, required: true },
	content: { type: String, required: true },
	photos: [{ type: String }],
	likes: [{ type: Types.ObjectId, ref: "User" }],
	comments: [{ type: Types.ObjectId, ref: "User" }],
});

postSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
});

const Post = model<IPost>("Post", postSchema);

export default Post;
