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
    birthdate: {
        type: String,
        required: true,
    },
    created_at: {
        type: new Date(),
    },
});
const User = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=User.js.map