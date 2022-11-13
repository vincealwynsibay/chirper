import { Types } from "mongoose";
import { uploadImage } from "../utils/cloudinary";
import Post, { IPost } from "../models/postModel";

const getAll = async () => {
	return await Post.find();
};

const getById = async (id: string) => {
	return await Post.findById(id);
};

const create = async (postParams: IPost) => {
	const photos = [];

	if (postParams.photos.length > 0) {
		for (let i = 0; i < postParams.photos.length; i++) {
			photos[i] = await uploadImage(postParams.photos[i]);
		}
	}

	const postObject = {
		...postParams,
		photos,
	};
	const newPost = new Post(postObject);
	return await newPost.save();
};

const update = async (id: string, user_id: Types.ObjectId, postParams: any) => {
	const post = await Post.findById(id);

	if (!post) {
		throw "Post does not exist";
	}

	if (post.user_id.toString() !== user_id.toString()) {
		throw "Not Authorized";
	}

	Object.assign(post, postParams);
	await post.save();
};

const _delete = async (id: string) => {
	await Post.findByIdAndRemove(id);
};

const like = async (id: string, user_id: Types.ObjectId) => {
	const post = await Post.findById(id);

	if (!post) {
		throw "Post not found";
	}

	if (post.likes.some((like) => like.toString() === user_id.toString())) {
		throw "Post already liked";
	}

	post.likes.unshift(user_id);
	await post.save();
};

const unlike = async (id: string, user_id: Types.ObjectId) => {
	const post = await Post.findById(id);

	if (!post) {
		throw "Post not found";
	}

	if (!post.likes.some((like) => like.toString() === user_id.toString())) {
		throw "Post not liked yet";
	}

	post.likes = post.likes.filter(
		(like) => like.toString() !== user_id.toString()
	);
	await post.save();
};

const getUserLikes = async (user_id: Types.ObjectId) => {
	const posts = await Post.find({ likes: user_id });
	return posts;
};

const getUserPosts = async (user_id: string) => {
	const posts = await Post.find({ user_id });
	return posts;
};

export default {
	getAll,
	getById,
	create,
	update,
	_delete,
	like,
	unlike,
	getUserLikes,
	getUserPosts,
};
