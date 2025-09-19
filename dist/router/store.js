"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = exports.itemRouter = exports.authRouter = void 0;
const auth_1 = __importDefault(require("./auth"));
exports.authRouter = auth_1.default;
const item_1 = __importDefault(require("./item"));
exports.itemRouter = item_1.default;
const booking_1 = __importDefault(require("./booking"));
exports.bookingRouter = booking_1.default;
//# sourceMappingURL=store.js.map