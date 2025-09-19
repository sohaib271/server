import prisma from "../model/prisma";
import stripe from "stripe"
import { Auth } from "./authClass";
import {Request,Response} from "express"
import { ParamsDictionary} from "express-serve-static-core"

const payment=new stripe.Stripe(process.env.STRIPE_SECRET_KEY as string);

interface BookingParams extends ParamsDictionary {
  id: string;
}


async function addBooking(req:Request,res:Response){
  const {items,table_no,booked_by,reserved_from,reserved_to}=req.body;
  const booking=await prisma.bookings.create({data:{
    table_no:table_no,
    booked_by:booked_by,
    reserved_from:reserved_from,
    reserved_to:reserved_to,
    items:{
      create:items.map((item:any)=> ({
        item_id:item.item_id,
        quantity:item.quantity
      }))
    }
  },
  include:{
    items:true
  }
});

  if(!booking) return res.json({msg:"Booking not reached"});

  return res.json({success:"Table booked"});
};

async function bookingPayment(req:Request,res:Response){
  const {items}=req.body;
  const line_items=items.map((item:any)=>({
    price_data:{
      currency:'pkr',
      product_data:{name:item.item_name,images:[item.item_image]},
      unit_amount:Math.round(item.item_price * 100 * 0.3),
    },
    quantity:item.quantity || 1,
  }));

  try {
    const session=await payment.checkout.sessions.create({
      payment_method_types:['card'],
      line_items,
      mode:'payment',
      success_url:`${process.env.CLIENT_URL}/confirmbooking`,
      cancel_url:`${process.env.CLIENT_URL}/cancel`
    });

    return res.json({id:session.id,url:session.url})
  } catch (error) {
    res.status(500).json({err:"Failed payment"})
  }
}

async function bookingList(req:Request<BookingParams>,res:Response){
  const bookedBy=parseInt(req.params.id,10);
  const user=await Auth.findUser(bookedBy);
  
  if(!user) return res.status(404).json({msg:"User not found"});

  if(user.role==="Customer"){
    const myBookings=await prisma.bookings.findMany({where:{booked_by:bookedBy},include:{items:{include:{item:{select:{item_name:true,item_image:true,price:true}}}},user:{select:{name:true,image:true}}}});
    return res.json({myBookings});
  }

  if(user.role==="Admin"){
    const allBookings=await prisma.bookings.findMany({include:{items:{include:{item:{select:{item_name:true,item_image:true,price:true}}}},user:{select:{name:true,image:true}}}});
    return res.json({allBookings});
  }
}

async function updateBookingStatus(req:Request<BookingParams>,res:Response){
  const bookingId=parseInt(req.params.id);
  const {st}=req.body;
  const update=await prisma.bookings.update({where:{id:bookingId},data:{status:st}});

  if(!update) return res.json({msg:"Status not updated"});
  return res.json({success:"Status Updated"});
}

export {addBooking,bookingPayment,bookingList,updateBookingStatus};