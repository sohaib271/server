"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloud_1 = require("../util/cloud");
const item_1 = require("../controller/item");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/upload", cloud_1.upload.single("item_image"), item_1.uploadItem);
router.get("/all", item_1.getItems);
router.delete("/delete/:id", item_1.deleteItem);
exports.default = router;
//# sourceMappingURL=item.js.map