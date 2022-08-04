import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";

config();
export const SECRET_KEY: Secret = "your-secret-key-here";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Not authenticated");
  }
};
