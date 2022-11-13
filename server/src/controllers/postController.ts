import { Request, Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "src/types";
import postService from "../services/postService";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const posts = await postService.getAll();
		return res.json(posts);
	} catch (err) {
		next(err);
	}
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const post = await postService.getById(req.params.id);
		return res.json(post);
	} catch (err) {
		next(err);
	}
};

const create = async (
	req: IGetUserAuthInfoRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { title, content } = req.body;

		const photos =
			req.files && (req.files as any).map((file: any) => file.path);

		const post = await postService.create({
			user_id: req.user.id,
			title,
			content,
			likes: [],
			comments: [],
			photos,
		});

		return res.json(post);
	} catch (err) {
		next(err);
	}
};

const update = async (
	req: IGetUserAuthInfoRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { title, content } = req.body;

		await postService.update(req.params.id, req.user.id, {
			title,
			content,
		});

		return res.json({});
	} catch (err) {
		next(err);
	}
};

const _delete = async (
	req: IGetUserAuthInfoRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		await postService._delete(req.params.id);
		return res.json({});
	} catch (err) {
		next(err);
	}
};

const like = async (
	req: IGetUserAuthInfoRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		await postService.like(req.body.id, req.user.id);
	} catch (err) {
		next(err);
	}
};

const unlike = async (
	req: IGetUserAuthInfoRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		await postService.like(req.body.id, req.user.id);
	} catch (err) {
		next(err);
	}
};

const getUserPosts = async (
	req: IGetUserAuthInfoRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const posts = await postService.getUserPosts(req.params.id);
		return res.json(posts);
	} catch (err) {
		next(err);
	}
};

export default {
	getAll,
	getById,
	create,
	update,
	_delete,
	like,
	unlike,
	getUserPosts,
};
