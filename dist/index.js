"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
require("./util/notifier");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const store_1 = require("./router/store");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/server", (req, res) => {
    res.send("Node js & Typescript");
});
app.use("/auth", store_1.authRouter);
app.use("/item", store_1.itemRouter);
app.use("/table", store_1.bookingRouter);
const Port = process.env.PORT || 8000;
app.listen(Port, () => console.log("server Started"));
//# sourceMappingURL=index.js.map