import { Request, Response, NextFunction } from "express";
declare function checkUser(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export default checkUser;
//# sourceMappingURL=auth.d.ts.map