import express from "express";
import { addBooking, bookingPayment, bookingList,updateBookingStatus } from "../controller/booking";

const router=express.Router();


router.post("/book",addBooking);
router.post("/payment",bookingPayment);
router.get("/all/:id",bookingList);
router.patch("/update-status/:id",updateBookingStatus);


export default router;