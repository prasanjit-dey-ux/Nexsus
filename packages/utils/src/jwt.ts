import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export interface JwtPayload {
    userId: string;
    iat: number; // issued at
    exp: number; // expired at
}

export const generateJWT = (userId: string) : string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, {expiresIn: "7d"})
};

export const verifyJWT = (token: string) : JwtPayload => {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
        throw new Error ("Invalid or Expired token")
    }
    
}