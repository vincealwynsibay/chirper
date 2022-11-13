"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../services/userService"));
const gravatar_1 = __importDefault(require("gravatar"));
const authenticate = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await userService_1.default.authenticate(email, password);
        if (user) {
            return res.json(Object.assign({}, user));
        }
        else {
            return res
                .status(400)
                .json({ message: "Email or Password is incorrect" });
        }
    }
    catch (err) {
        next(err);
    }
};
const register = async (req, res, next) => {
    try {
        const { username, password, email, birthDate } = req.body;
        const userObject = {
            username,
            password,
            email,
            birthDate,
            displayName: username,
            bio: "",
            avatar: gravatar_1.default.url(email, { s: "100", r: "x", d: "retro" }),
            followers: [],
            following: [],
        };
        await userService_1.default.create(userObject);
        return res.json({ registered: true });
    }
    catch (err) {
        next(err);
    }
};
const getAll = async (req, res, next) => {
    try {
        const users = await userService_1.default.getAll();
        return res.json(users);
    }
    catch (err) {
        next(err);
    }
};
const getById = async (req, res, next) => {
    try {
        const user = await userService_1.default.getById(req.params.id);
        if (user) {
            return res.json(user);
        }
        else {
            return res.status(400).json({ message: "User not found" });
        }
    }
    catch (err) {
        next(err);
    }
};
const update = (req, res, next) => {
    try {
        userService_1.default.update(req.params.id, req.body);
        return res.json({});
    }
    catch (err) {
        next(err);
    }
};
const _delete = async (req, res, next) => {
    try {
        await userService_1.default._delete(req.params.id);
        return res.json({});
    }
    catch (err) {
        next(err);
    }
};
const follow = async (req, res, next) => {
    try {
        await userService_1.default.follow(req.params.id, req.user.id);
        return res.json({});
    }
    catch (err) {
        next(err);
    }
};
const unfollow = async (req, res, next) => {
    try {
        await userService_1.default.unfollow(req.params.id, req.user.id);
        return res.json({});
    }
    catch (err) {
        next(err);
    }
};
const getFollowers = async (req, res, next) => {
    try {
        const followers = await userService_1.default.getFollowers(req.params.id);
        return res.json({ followers });
    }
    catch (err) {
        next(err);
    }
};
const getFollowing = async (req, res, next) => {
    try {
        const followedUsers = await userService_1.default.getFollowing(req.params.id);
        return res.json({ followedUsers });
    }
    catch (err) {
        next(err);
    }
};
exports.default = {
    authenticate,
    register,
    update,
    _delete,
    getAll,
    getById,
    follow,
    unfollow,
    getFollowers,
    getFollowing,
};
//# sourceMappingURL=userController.js.map