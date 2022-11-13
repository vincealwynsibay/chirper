"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    birthDate: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    followers: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "User",
        },
    ],
    following: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "User",
        },
    ],
    created_at: {
        type: String,
        default: Date(),
    },
});
userSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    },
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
//# sourceMappingURL=userModel.js.map