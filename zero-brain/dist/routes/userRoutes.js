"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const config_1 = require("../config");
const userMiddleWare_1 = require("../userMiddleWare");
const utils_1 = require("../utils");
const router = express_1.default.Router();
const signupSchema = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(8)
});
const signinSchema = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(8)
});
//@ts-ignore
router.post('/signup', (req, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
        return response.status(411).json({
            message: "Validation failed/ wrong input"
        });
    }
    try {
        const existingUser = yield db_1.User.findOne({
            username: req.body.username
        });
        if (existingUser) {
            return response.status(409).json({
                message: "Email already taken"
            });
        }
        const newUser = yield db_1.User.create({
            username: req.body.username,
            password: req.body.password
        });
        response.status(201).json({
            message: "user created successfully"
        });
    }
    catch (err) {
        response.status(500).json({
            message: "internal server error"
        });
    }
}));
// @ts-ignore
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "User does not exist"
        });
    }
    const existingUser = yield db_1.User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_SECRET);
        res.json({
            token
        });
    }
    else {
        res.status(403).json({
            message: "Invalid credentials"
        });
    }
}));
// const contentSchema = zod.object({
//     title : zod.string(),
//     link : zod.string(),  
// })
//@ts-ignore
router.post('/content', userMiddleWare_1.userMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;
    yield db_1.Content.create({
        title,
        link,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.status(201).json({
        message: "Content created"
    });
}));
router.get('/content', userMiddleWare_1.userMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.Content.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
router.delete('/content', userMiddleWare_1.userMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_1.Content.deleteOne({
        contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "deleted"
    });
}));
router.post('/brain/share', userMiddleWare_1.userMiddleWare, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.Link.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.Link.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({
            message: "/share/" + hash
        });
    }
    else {
        yield db_1.Link.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            message: "Removed Shareable link!! "
        });
    }
}));
//@ts-ignore
router.get('/brain/:share', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.share;
    const link = yield db_1.Link.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry ! incorrect input..."
        });
        return;
    }
    // userId
    const content = yield db_1.Content.find({
        userId: link.userId
    });
    const user = yield db_1.User.findOne({
        _id: link.userId
    });
    if (!user) {
        return res.status(411).json({
            message: "user not found, ideally it should not happen"
        });
    }
    res.json({
        username: user.username,
        content
    });
}));
exports.default = router;
