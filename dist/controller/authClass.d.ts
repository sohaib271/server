import jwt from "jsonwebtoken";
declare class GoogleAuth {
    findUser(id: number): Promise<{
        id: number;
        name: string;
        email: string;
        password: string | null;
        created_at: Date;
        role: string;
        image: string | null;
        refreshToken: string | null;
    } | null>;
    generateAccessToken(id: number): Promise<string>;
    generateRefreshToken(id: number): Promise<string>;
    decodeToken(token: string): jwt.JwtPayload | null;
}
export declare const Auth: GoogleAuth;
export {};
//# sourceMappingURL=authClass.d.ts.map