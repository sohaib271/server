import jwt, { JwtPayload } from "jsonwebtoken"
import prisma from "../model/prisma";


class GoogleAuth{
  async findUser(id:number){
    return await prisma.user.findUnique({where:{id}})
  }
  async generateAccessToken(id:number){
    let user=await this.findUser(id);
    if (!user) {
      throw new Error("User not found");
    }
    const accessToken= jwt.sign(
      {id:id, email:user?.email,role:user?.role},
      process.env.SECRET_KEY as string,
      {expiresIn: "30m"});
      return accessToken
  }

  async generateRefreshToken(id:number){
    const user=await this.findUser(id);
    if(!user) throw new Error("User not found");

    const refreshToken=jwt.sign({id:id},process.env.SECRET_KEY as string, {expiresIn:"20d"});
    
    await prisma.user.update({where:{id:user.id},data:{refreshToken}})

    return refreshToken;
  }

  decodeToken(token:string){
    try {
      return jwt.verify(token,process.env.SECRET_KEY as string) as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}

export const Auth=new GoogleAuth();