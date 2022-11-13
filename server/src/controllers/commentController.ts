import { Request, Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../types";
import commentService from "../services/commentService";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const comments = await commentService.getAll();
		return res.json(comments);
	} catch (err) {
		next(err);
	}
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const comment = await commentService.getById(req.params.id);
		return res.json(comment);
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
		const { content, parentCommentId } = req.body;
		const commentObject = {
			user_id: req.user.id,
			post_id: req.params.id,
			comment: parentCommentId ? parentCommentId : null,
			content,
			likes: [],
		};

		const comment = await commentService.create(commentObject);
		return res.json(comment);
	} catch (err) {
		next(err);
	}
};
const update = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { commentId, content } = req.body;
		await commentService.update(commentId, { content });
		return res.json({ success: true });
	} catch (err) {
		next(err);
	}
};
const _delete = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { commentId } = req.body;
		await commentService._delete(commentId);
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
		const { commentId } = req.body;
		await commentService.like(commentId, req.user.id);
		return res.json({});
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
		const { commentId } = req.body;
		await commentService.like(commentId, req.user.id);
		return res.json({});
	} catch (err) {
		next(err);
	}
};

const getPostsComments = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const comments = await commentService.getPostsComments(req.params.id);
		return res.json(comments);
	} catch (err) {
		next(err);
	}
};

const getUsersComments = async (
	req: IGetUserAuthInfoRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const comments = await commentService.getUsersComments(req.user.id);
		return res.json(comments);
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
	getPostsComments,
	getUsersComments,
};
