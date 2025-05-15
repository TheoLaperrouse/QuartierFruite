import { Request, Response } from "express";
import { authService } from "../auth.service";
import { ApiError } from "../utils/apiError";

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      ApiError.handle(error, res);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(result);
    } catch (error) {
      ApiError.handle(error, res);
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshToken(refreshToken);
      res.json(result);
    } catch (error) {
      ApiError.handle(error, res);
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      await authService.logout(refreshToken);
      res.status(204).end();
    } catch (error) {
      ApiError.handle(error, res);
    }
  }
}

export const authController = new AuthController();
