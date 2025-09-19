import prisma from "../model/prisma";
import { Request, Response, NextFunction } from "express";
import { Auth } from "../controller/authClass";


async function checkUser(req:Request,res:Response,next:NextFunction){
  try {
    const token=req.cookies.accessToken;
    if(!token) return res.status(403).json({msg:"Token expired or unavailable"});
    const verifyToken=Auth.decodeToken(token);
    if(!verifyToken) return res.status(404).json({msg:"Invalid token or user not found"});
    const user=await prisma.user.findUnique({where:{id:verifyToken.id},select:{id:true}});
    (req as any).user=user
  } catch (error) {
    return res.status(500).json({ msg: "Authentication failed" })
  }
}

export default checkUser;