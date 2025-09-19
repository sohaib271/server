"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBooking = addBooking;
exports.bookingPayment = bookingPayment;
exports.bookingList = bookingList;
exports.updateBookingStatus = updateBookingStatus;
const prisma_1 = __importDefault(require("../model/prisma"));
const stripe_1 = __importDefault(require("stripe"));
const authClass_1 = require("./authClass");
const payment = new stripe_1.default.Stripe(process.env.STRIPE_SECRET_KEY);
async function addBooking(req, res) {
    const { items, table_no, booked_by, reserved_from, reserved_to } = req.body;
    const booking = await prisma_1.default.bookings.create({ data: {
            table_no: table_no,
            booked_by: booked_by,
            reserved_from: reserved_from,
            reserved_to: reserved_to,
            items: {
                create: items.map((item) => ({
                    item_id: item.item_id,
                    quantity: item.quantity
                }))
            }
        },
        include: {
            items: true
        } });
    if (!booking)
        return res.json({ msg: "Booking not reached" });
    return res.json({ success: "Table booked" });
}
;
async function bookingPayment(req, res) {
    const { items } = req.body;
    const line_items = items.map((item) => ({
        price_data: {
            currency: 'pkr',
            product_data: { name: item.item_name, images: [item.item_image] },
            unit_amount: Math.round(item.item_price * 100 * 0.3),
        },
        quantity: item.quantity || 1,
    }));
    try {
        const session = await payment.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/confirmbooking`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`
        });
        return res.json({ id: session.id, url: session.url });
    }
    catch (error) {
        res.status(500).json({ err: "Failed payment" });
    }
}
async function bookingList(req, res) {
    const bookedBy = parseInt(req.params.id, 10);
    const user = await authClass_1.Auth.findUser(bookedBy);
    if (!user)
        return res.status(404).json({ msg: "User not found" });
    if (user.role === "Customer") {
        const myBookings = await prisma_1.default.bookings.findMany({ where: { booked_by: bookedBy }, include: { items: { include: { item: { select: { item_name: true, item_image: true, price: true } } } }, user: { select: { name: true, image: true } } } });
        return res.json({ myBookings });
    }
    if (user.role === "Admin") {
        const allBookings = await prisma_1.default.bookings.findMany({ include: { items: { include: { item: { select: { item_name: true, item_image: true, price: true } } } }, user: { select: { name: true, image: true } } } });
        return res.json({ allBookings });
    }
}
async function updateBookingStatus(req, res) {
    const bookingId = parseInt(req.params.id);
    const { st } = req.body;
    const update = await prisma_1.default.bookings.update({ where: { id: bookingId }, data: { status: st } });
    if (!update)
        return res.json({ msg: "Status not updated" });
    return res.json({ success: "Status Updated" });
}
//# sourceMappingURL=booking.js.map