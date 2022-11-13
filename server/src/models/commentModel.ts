import { Schema, model, Types, ObjectId } from "mongoose";

export interface IComment {
	user_id: ObjectId;
	post_id: ObjectId;
	content: string;
	parentId: ObjectId | null;
	likes: Types.ObjectId[];
	created_at: string;
	modified_at: string;
}

const commentSchema = new Schema<IComment>({
	user_id: {
		type: Types.ObjectId,
		ref: "User",
	},
	post_id: {
		type: Types.ObjectId,
		ref: "Post",
	},
	parentId: {
		type: Types.ObjectId,
		ref: "Comment",
	},
	content: {
		type: String,
		required: true,
	},
	likes: [
		{
			type: Types.ObjectId,
			ref: "User",
		},
	],
	created_at: {
		type: String,
		default: Date(),
	},
	modified_at: {
		type: String,
		default: Date(),
	},
});

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;
