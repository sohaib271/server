import {upload} from "../util/cloud";
import { uploadItem,getItems,deleteItem } from "../controller/item";
import express from "express";

const router=express.Router();

router.post("/upload",upload.single("item_image"),uploadItem);
router.get("/all",getItems);
router.delete("/delete/:id",deleteItem);


export default router;