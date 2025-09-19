"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadItem = uploadItem;
exports.getItems = getItems;
exports.deleteItem = deleteItem;
const prisma_1 = __importDefault(require("../model/prisma"));
async function uploadItem(req, res) {
    const { item_name, description, price } = req.body;
    if (!req.file)
        return res.json({ msg: "Image not uploaded" });
    const item_image = req.file.path;
    const item = await prisma_1.default.items.create({ data: { item_name: item_name, description: description, item_image: item_image, price: price } });
    if (!item)
        return res.json({ msg: "Item not uploaded" });
    return res.json({ success: "Item Uploaded" });
}
;
async function getItems(req, res) {
    const item = await prisma_1.default.items.findMany();
    if (!item)
        return res.json({ msg: "Error fetching items" });
    return res.json({ item: item });
}
async function deleteItem(req, res) {
    const itemId = parseInt(req.params.id);
    const item = await prisma_1.default.items.delete({ where: { id: itemId } });
    if (!item)
        return res.json({ msg: "Item not deleted" });
    return res.json({ success: "Item deleted Successfully" });
}
//# sourceMappingURL=item.js.map