import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import "./util/notifier";
import cookieParser from "cookie-parser";
import {authRouter,bookingRouter,itemRouter} from "./router/store"

dotenv.config();
const app=express();

app.use(cors({
  origin: process.env.CLIENT_URL || "https://client1-three-orpin.vercel.app",
  credentials:true
}));

app.use(express.json())
app.use(cookieParser());


app.get("/server",(req,res)=>{
  res.send("Node js & Typescript");
});

app.use("/auth",authRouter);
app.use("/item",itemRouter);
app.use("/table",bookingRouter);

const Port=process.env.PORT || 8000;

app.listen(Port,()=>console.log("server Started"))