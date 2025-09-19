"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../model/prisma"));
class GoogleAuth {
    async findUser(id) {
        return await prisma_1.default.user.findUnique({ where: { id } });
    }
    async generateAccessToken(id) {
        let user = await this.findUser(id);
        if (!user) {
            throw new Error("User not found");
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: id, email: user?.email, role: user?.role }, process.env.SECRET_KEY, { expiresIn: "30m" });
        return accessToken;
    }
    async generateRefreshToken(id) {
        const user = await this.findUser(id);
        if (!user)
            throw new Error("User not found");
        const refreshToken = jsonwebtoken_1.default.sign({ id: id }, process.env.SECRET_KEY, { expiresIn: "20d" });
        await prisma_1.default.user.update({ where: { id: user.id }, data: { refreshToken } });
        return refreshToken;
    }
    decodeToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        }
        catch (error) {
            return null;
        }
    }
}
exports.Auth = new GoogleAuth();
//# sourceMappingURL=authClass.js.map