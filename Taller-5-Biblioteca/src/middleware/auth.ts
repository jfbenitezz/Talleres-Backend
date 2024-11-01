import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { IUser } from '../user/v1/user.types';

export interface JwtPayload {
    id: string;
    permissions: string[];
    iat: number;
    exp: number;
}

async function AuthMiddleware(request: Request, response: Response, next: NextFunction) {

    if (request.headers.authorization === undefined) {
        return response.status(401).json({
            message: "Not authorized."
        })
    }
    const token = request.headers.authorization.split(' ')[1];
    try {
        const jwtValues = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        // Attach user data to request.user
        request.body.authorization = {
            id: jwtValues.id,
            permissions: jwtValues.permissions
        };
        next();
    } catch (error) {
        return response.status(401).json({
            message: "Not authorized."
        })
    }
}

async function generateToken(user: Partial<IUser>) {
  const payload = {
    id: user._id,
    permissions: user.permissions
  };
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
}

export { generateToken, AuthMiddleware };

