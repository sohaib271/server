"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../model/prisma"));
const authClass_1 = require("../controller/authClass");
async function checkUser(req, res, next) {
    try {
        const token = req.cookies.accessToken;
        if (!token)
            return res.status(403).json({ msg: "Token expired or unavailable" });
        const verifyToken = authClass_1.Auth.decodeToken(token);
        if (!verifyToken)
            return res.status(404).json({ msg: "Invalid token or user not found" });
        const user = await prisma_1.default.user.findUnique({ where: { id: verifyToken.id }, select: { id: true } });
        req.user = user;
    }
    catch (error) {
        return res.status(500).json({ msg: "Authentication failed" });
    }
}
exports.default = checkUser;
//# sourceMappingURL=auth.js.map