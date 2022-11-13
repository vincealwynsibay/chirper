"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const mongoose_1 = require("mongoose");
const create = async (userParam) => {
    if ((await userModel_1.default.findOne({ username: userParam.username })) ||
        (await userModel_1.default.findOne({ email: userParam.email }))) {
        throw `Username ${userParam.username} is already taken`;
    }
    const newUser = new userModel_1.default(userParam);
    if (userParam.password) {
        newUser.password = await bcryptjs_1.default.hash(userParam.password, 10);
    }
    await newUser.save();
};
const authenticate = async (email, password) => {
    const user = await userModel_1.default.findOne({ email });
    if (!user) {
        throw "User does not exist";
    }
    const valid = bcryptjs_1.default.compare(password, user.password);
    if (!valid) {
        throw "Incorrect Credentials";
    }
    const token = jsonwebtoken_1.default.sign({ sub: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return { user, token };
};
const getAll = async () => {
    return await userModel_1.default.find({});
};
const getById = async (id) => {
    return await userModel_1.default.findById(id);
};
const update = async (id, userParam) => {
    const user = await userModel_1.default.findById(id);
    if (!user) {
        throw new Error("User does not exist");
    }
    if (user.username !== userParam.username &&
        (await userModel_1.default.findOne({ username: userParam.username }))) {
        throw new Error(`Username ${userParam.username} already taken`);
    }
    if (userParam.password) {
        userParam.password = bcryptjs_1.default.hash(userParam.password, 10);
    }
    Object.assign(user, userParam);
    await user.save();
};
const _delete = async (id) => {
    return await userModel_1.default.findByIdAndRemove(id);
};
const follow = async (id, currentUserId) => {
    const user = await userModel_1.default.findById(id);
    const currentUser = await userModel_1.default.findById(currentUserId);
    if (!user) {
        throw "User not found";
    }
    if (user.followers.some((follower) => follower.toString() === currentUserId.toString())) {
        throw "User already followed";
    }
    user.followers.unshift(currentUserId);
    currentUser === null || currentUser === void 0 ? void 0 : currentUser.following.unshift(new mongoose_1.Types.ObjectId(id));
    await user.save();
    await (currentUser === null || currentUser === void 0 ? void 0 : currentUser.save());
};
const unfollow = async (id, currentUserId) => {
    const user = await userModel_1.default.findById(id);
    const currentUser = await userModel_1.default.findById(currentUserId);
    if (!user) {
        throw "User not found";
    }
    if (!currentUser) {
        return;
    }
    if (!user.followers.some((follower) => follower.toString() === currentUserId.toString())) {
        throw "User already not followed";
    }
    user.followers = user.followers.filter((follower) => follower.toString() !== currentUserId.toString());
    currentUser.following = currentUser.following.filter((following) => following.toString() !== id.toString());
    await user.save();
    await currentUser.save();
};
const getFollowers = async (id) => {
    return await userModel_1.default.findById(id).populate("followers");
};
const getFollowing = async (id) => {
    return await userModel_1.default.findById(id).populate("following");
};
exports.default = {
    authenticate,
    create,
    update,
    _delete,
    getAll,
    getById,
    follow,
    unfollow,
    getFollowers,
    getFollowing,
};
//# sourceMappingURL=userService.js.map