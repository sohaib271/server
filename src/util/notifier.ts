import sgMail from "@sendgrid/mail";
import prisma from "../model/prisma";
import crone from "node-cron";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const sendEmail=async(to:string,subject:string,text:string,html:string)=>{
  const msg={
    to,
    from:"finedine94@gmail.com",
    subject,
    text,
    html,
  };

  await sgMail.send(msg);
};

crone.schedule("* * * * *",async ()=>{
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const reservations=await prisma.bookings.findMany({where:{reserved_from:{gte:startOfDay,lte:endOfDay},isNotified:false},include:{user:{select:{email:true}}}});

  for (const res of reservations){
    await sendEmail(
      res.user.email,
      "Reservation Reminder",
      `Hello! Your reservation is scheduled for today (${new Date(res.reserved_from).toLocaleDateString()}). Kindly  check your booking details for confimation.`,
       `<h3>Reservation Reminder</h3>
       <p>Your reservation is today at: <b>${new Date(res.reserved_from).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</b>. We look forward to serving you!</p>`
    )

    await prisma.bookings.update({where:{id:res.id},data:{isNotified:true}});
  }
})