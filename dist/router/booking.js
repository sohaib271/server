"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_1 = require("../controller/booking");
const router = express_1.default.Router();
router.post("/book", booking_1.addBooking);
router.post("/payment", booking_1.bookingPayment);
router.get("/all/:id", booking_1.bookingList);
router.patch("/update-status/:id", booking_1.updateBookingStatus);
exports.default = router;
//# sourceMappingURL=booking.js.map