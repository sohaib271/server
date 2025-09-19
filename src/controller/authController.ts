import prisma from "../model/prisma";
import { oauth2client } from "../util/googleConfig";
import axios from "axios"
import{Request,Response} from "express";
import {Auth} from "./authClass"
import { JwtPayload } from "jsonwebtoken";

interface AuthParams {
  id:string;
}

async function googleLogin(req:any,res:any){
  try {
    const {code}=req.query;
    const googleRes=await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);
    const userRes= await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
    
    const {name,email,picture} = userRes.data;

    let user=await prisma.user.findUnique({where:{email}});

    if(!user){
      user=await prisma.user.create({data:{name,email,image:picture}})
    }

    const {id}=user;
    const accessToken=await Auth.generateAccessToken(id);
    const refreshToken=await Auth.generateRefreshToken(id);

    const options={
      httpOnly:true,
      secure:false
    }

    let userInfo={id:user.id, name:name,email:email,image:picture,role:user.role};

    res.status(200).cookie("accessToken",accessToken,options).cookie("refreshToken",refreshToken,options).json({msg:"Token Generated Successfully",token:accessToken,userInfo});
  } catch (error) {
    res.status(500).json({err:"Internal Server Error"})
  }
}

async function refreshAccessToken(req:any,res:any){
    const options={
    httpOnly:true,
    secure:false
  };
  const userId=req.params.id;
  const refreshToken=req.cookies.refreshToken;
  if(!refreshToken) {
    const generateAccessToken=await Auth.generateAccessToken(userId);
    const generateRefreshToken=await Auth.generateAccessToken(userId);
    await prisma.user.update({where:{id:userId},data:{refreshToken:generateRefreshToken}})
    return res.status(200).cookie("accessToken",generateAccessToken,options).cookie("refreshToken",generateRefreshToken,options).json({msg:"Token Refreshed Successfully"});
  };

  const decode=Auth.decodeToken(refreshToken);
  if(!decode) return res.status(401).json({msg:"Invalid Token"});

  const findUser=await prisma.user.findUnique({where:{id:decode.id}});

  if(findUser?.refreshToken!==refreshToken) return res.status(405).json({msg:"Token does not match"});

  const generateAccessToken=await Auth.generateAccessToken(decode.id);
  const generateRefreshToken=await Auth.generateRefreshToken(decode.id);

  await prisma.user.update({where:{id:decode.id},data:{refreshToken:generateRefreshToken}})

  return res.status(200).cookie("accessToken",generateAccessToken,options).cookie("refreshToken",generateRefreshToken,options).json({msg:"Token Refreshed Successfully"});
}

async function logOut(req:Request <AuthParams>,res:any){
  const userId=parseInt(req.params.id);
  const token=req.cookies.refreshToken;
  const decode=Auth.decodeToken(token) as JwtPayload
    const removeToken=await prisma.user.update({where:{id:userId},data:{refreshToken:null}})
    if(!removeToken) throw new Error("Db not updated");

    const options={
      httpOnly:true,
      secure:false,
    }

    return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options).json({msg:"Log out successful"});
}

export {googleLogin,refreshAccessToken,logOut};