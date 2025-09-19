"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
const prisma_1 = __importDefault(require("../model/prisma"));
const node_cron_1 = __importDefault(require("node-cron"));
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const sendEmail = async (to, subject, text, html) => {
    const msg = {
        to,
        from: "finedine94@gmail.com",
        subject,
        text,
        html,
    };
    await mail_1.default.send(msg);
};
node_cron_1.default.schedule("0 9 * * *", async () => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const reservations = await prisma_1.default.bookings.findMany({ where: { reserved_from: { gte: startOfDay, lte: endOfDay }, isNotified: false }, include: { user: { select: { email: true } } } });
    for (const res of reservations) {
        await sendEmail(res.user.email, "Reservation Reminder", `Hello! Your reservation is scheduled for today (${new Date(res.reserved_from).toLocaleDateString()}). Kindly  check your booking details for confimation.`, `<h3>Reservation Reminder</h3>
       <p>Your reservation is today at: <b>${new Date(res.reserved_from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</b>. We look forward to serving you!</p>`);
        await prisma_1.default.bookings.update({ where: { id: res.id }, data: { isNotified: true } });
    }
});
//# sourceMappingURL=notifier.js.map