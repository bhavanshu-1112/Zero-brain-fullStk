"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.Content = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb://localhost:27017/zeroBrain");
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});
exports.User = mongoose_1.default.model("User", userSchema);
const contentSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }],
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
exports.Content = mongoose_1.default.model("Content", contentSchema);
const LinkSchema = new mongoose_1.default.Schema({
    hash: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
});
exports.Link = mongoose_1.default.model("Link", LinkSchema);
