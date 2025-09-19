import {v2 as cloudinary} from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:process.env.CLOUDINARY_API_KEY!,
  api_secret:process.env.CLOUDINARY_API_SECRET!
});

const storage=new CloudinaryStorage({
  cloudinary:cloudinary,
  params:{
    folder:"finedine",
    format:async (req:any,file:any)=>"webp",
    public_id: (req:any,file:any)=> `${Date.now()}-${file.originalname}`
  } as any
});

const upload=multer({storage});

export {cloudinary,upload};