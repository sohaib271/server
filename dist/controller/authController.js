"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = googleLogin;
exports.refreshAccessToken = refreshAccessToken;
exports.logOut = logOut;
const prisma_1 = __importDefault(require("../model/prisma"));
const googleConfig_1 = require("../util/googleConfig");
const axios_1 = __importDefault(require("axios"));
const authClass_1 = require("./authClass");
async function googleLogin(req, res) {
    try {
        const { code } = req.query;
        const googleRes = await googleConfig_1.oauth2client.getToken(code);
        googleConfig_1.oauth2client.setCredentials(googleRes.tokens);
        const userRes = await axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
        const { name, email, picture } = userRes.data;
        let user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            user = await prisma_1.default.user.create({ data: { name, email, image: picture } });
        }
        const { id } = user;
        const accessToken = await authClass_1.Auth.generateAccessToken(id);
        const refreshToken = await authClass_1.Auth.generateRefreshToken(id);
        const options = {
            httpOnly: true,
            secure: false
        };
        let userInfo = { id: user.id, name: name, email: email, image: picture, role: user.role };
        res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json({ msg: "Token Generated Successfully", token: accessToken, userInfo });
    }
    catch (error) {
        res.status(500).json({ err: "Internal Server Error" });
    }
}
async function refreshAccessToken(req, res) {
    const options = {
        httpOnly: true,
        secure: false
    };
    const userId = req.params.id;
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        const generateAccessToken = await authClass_1.Auth.generateAccessToken(userId);
        const generateRefreshToken = await authClass_1.Auth.generateAccessToken(userId);
        await prisma_1.default.user.update({ where: { id: userId }, data: { refreshToken: generateRefreshToken } });
        return res.status(200).cookie("accessToken", generateAccessToken, options).cookie("refreshToken", generateRefreshToken, options).json({ msg: "Token Refreshed Successfully" });
    }
    ;
    const decode = authClass_1.Auth.decodeToken(refreshToken);
    if (!decode)
        return res.status(401).json({ msg: "Invalid Token" });
    const findUser = await prisma_1.default.user.findUnique({ where: { id: decode.id } });
    if (findUser?.refreshToken !== refreshToken)
        return res.status(405).json({ msg: "Token does not match" });
    const generateAccessToken = await authClass_1.Auth.generateAccessToken(decode.id);
    const generateRefreshToken = await authClass_1.Auth.generateRefreshToken(decode.id);
    await prisma_1.default.user.update({ where: { id: decode.id }, data: { refreshToken: generateRefreshToken } });
    return res.status(200).cookie("accessToken", generateAccessToken, options).cookie("refreshToken", generateRefreshToken, options).json({ msg: "Token Refreshed Successfully" });
}
async function logOut(req, res) {
    const userId = parseInt(req.params.id);
    const token = req.cookies.refreshToken;
    const decode = authClass_1.Auth.decodeToken(token);
    const removeToken = await prisma_1.default.user.update({ where: { id: userId }, data: { refreshToken: null } });
    if (!removeToken)
        throw new Error("Db not updated");
    const options = {
        httpOnly: true,
        secure: false,
    };
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json({ msg: "Log out successful" });
}
//# sourceMappingURL=authController.js.map