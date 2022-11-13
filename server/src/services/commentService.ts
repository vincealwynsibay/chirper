import { Types } from "mongoose";
import { uploadImage } from "../utils/cloudinary";
import Comment from "../models/commentModel";

const getAll = async () => {
	return await Comment.find({});
};

const getById = async (id: string) => {
	return await Comment.findById(id);
};

const create = async (commentParams: any) => {
	let photo = null;

	if (commentParams.photo) {
		photo = await uploadImage(commentParams.photo);
	}

	const comment = new Comment({ ...commentParams, photo });
	return await comment.save();
};

const update = async (comment_id: string, commentParams: any) => {
	const comment = await Comment.findById(comment_id);

	if (!comment) {
		throw "Comment not found";
	}

	Object.assign(comment, commentParams);
	comment.modified_at = Date();
	await comment.save();
};

const _delete = async (comment_id: string) => {
	await Comment.findByIdAndRemove(comment_id);
};

const like = async (id: string, user_id: Types.ObjectId) => {
	const comment = await Comment.findById(id);

	if (!comment) {
		throw "Comment not found";
	}

	if (comment.likes.some((like) => like.toString() === user_id.toString())) {
		throw "Comment already liked";
	}

	comment.likes.unshift(user_id);
	await comment.save();
};

const unlike = async (id: string, user_id: Types.ObjectId) => {
	const comment = await Comment.findById(id);

	if (!comment) {
		throw "Comment not found";
	}

	if (!comment.likes.some((like) => like.toString() === user_id.toString())) {
		throw "Comment not liked yet";
	}

	comment.likes = comment.likes.filter(
		(like) => like.toString() !== user_id.toString()
	);
	await comment.save();
};

const getPostsComments = async (id: string) => {
	const comments = await Comment.findOne({ post_id: id });
	return comments;
};

const getUsersComments = async (id: string) => {
	const comments = await Comment.findOne({ user_id: id });
	return comments;
};

export default {
	getAll,
	getById,
	create,
	update,
	_delete,
	like,
	unlike,
	getPostsComments,
	getUsersComments,
};
