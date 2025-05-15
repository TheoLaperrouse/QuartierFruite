import { Request, Response, NextFunction } from "express";
import { Auth } from "better-auth";
import { authConfig } from "../config/auth.config";
import { ApiError } from "../utils/apiError";

const auth = new Auth(authConfig);

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Authorization token missing");
    }

    const user = await auth.verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    ApiError.handle(error, res);
  }
};

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return ApiError.handle(
        new ApiError(403, "Forbidden - Insufficient permissions"),
        res
      );
    }
    next();
  };
};
