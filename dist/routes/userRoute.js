"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("./../utils/jwt");
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const router = (0, express_1.Router)();
router.post("/auth/login", userController_1.default.authenticate);
router.post("/auth/register", userController_1.default.register);
router.get("/users/", userController_1.default.getAll);
router.get("/users/:id", userController_1.default.getById);
router.put("/users/:id", userController_1.default.update);
router.delete("/users/:id", userController_1.default._delete);
router.put("/users/:id/follow", jwt_1.verifyAuth, userController_1.default.follow);
router.put("/users/:id/unfollow", jwt_1.verifyAuth, userController_1.default.unfollow);
router.get("/users/:id/followers", jwt_1.verifyAuth, userController_1.default.getFollowers);
router.get("/users/:id/following", jwt_1.verifyAuth, userController_1.default.getFollowing);
exports.default = router;
//# sourceMappingURL=userRoute.js.map