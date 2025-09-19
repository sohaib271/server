"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const router = express_1.default.Router();
router.get("/google", authController_1.googleLogin);
router.get("/refreshAccessToken/:id", authController_1.refreshAccessToken);
router.get("/logout/:id", authController_1.logOut);
exports.default = router;
//# sourceMappingURL=auth.js.map