import prisma from "../model/prisma";
import {Request,Response} from "express"


interface Item {
  id:string;
}

async function uploadItem(req:any,res:any){
  const {item_name,description,price}=req.body;
  if(!req.file) return res.json({msg:"Image not uploaded"});

  const item_image=req.file.path;

  const item=await prisma.items.create({data:{item_name:item_name,description:description,item_image:item_image,price:price}});

  if(!item) return res.json({msg:"Item not uploaded"});

  return res.json({success:"Item Uploaded"});
};


async function getItems(req:Request,res:Response){
  const item=await prisma.items.findMany();

  if(!item) return res.json({msg:"Error fetching items"});

  return res.json({item:item})
}

async function deleteItem(req:Request<Item>,res:Response){
  const itemId=parseInt(req.params.id);

  const item=await prisma.items.delete({where:{id:itemId}});

  if(!item) return res.json({msg:"Item not deleted"});

  return res.json({success:"Item deleted Successfully"});
}

export {uploadItem,getItems,deleteItem};