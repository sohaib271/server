import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
interface BookingParams extends ParamsDictionary {
    id: string;
}
declare function addBooking(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function bookingPayment(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function bookingList(req: Request<BookingParams>, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function updateBookingStatus(req: Request<BookingParams>, res: Response): Promise<Response<any, Record<string, any>>>;
export { addBooking, bookingPayment, bookingList, updateBookingStatus };
//# sourceMappingURL=booking.d.ts.map