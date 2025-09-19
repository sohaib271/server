import { Request } from "express";
interface AuthParams {
    id: string;
}
declare function googleLogin(req: any, res: any): Promise<void>;
declare function refreshAccessToken(req: any, res: any): Promise<any>;
declare function logOut(req: Request<AuthParams>, res: any): Promise<any>;
export { googleLogin, refreshAccessToken, logOut };
//# sourceMappingURL=authController.d.ts.map