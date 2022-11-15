/* title, content, user_id, likes, upvotes, tags, comments,  */
import { Schema, model, Types, ObjectId } from "mongoose";

export interface IPost {
	user: ObjectId;
	title: string;
	content: string;
	photos: string[];
	likes: Types.ObjectId[];
	comments: Types.ObjectId[];
	created_at: string;
	modified_at: string;
}

const postSchema = new Schema<IPost>({
	user: {
		type: Types.ObjectId,
		ref: "User",
	},
	title: { type: String, required: true },
	content: { type: String, required: true },
	photos: [{ type: String }],
	likes: [{ type: Types.ObjectId, ref: "User" }],
	comments: [{ type: Types.ObjectId, ref: "User" }],
	created_at: { type: String, default: Date() },
	modified_at: { type: String, default: Date() },
});

postSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
});

const Post = model<IPost>("Post", postSchema);

export default Post;
