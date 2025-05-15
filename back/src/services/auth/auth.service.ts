import { Auth } from "better-auth";
import { authConfig } from "../../config/auth.config";
import { RegisterInput, LoginResponse } from "../types/auth.types";

const auth = new Auth(authConfig);

export class AuthService {
  async register(input: RegisterInput) {
    return auth.register({
      email: input.email,
      password: input.password,
      name: input.name,
      role: input.role || "USER",
    });
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const { accessToken, refreshToken, user } = await auth.login(
      email,
      password
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async refreshToken(token: string): Promise<LoginResponse> {
    const { accessToken, refreshToken, user } = await auth.refreshToken(token);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async logout(token: string): Promise<void> {
    return auth.logout(token);
  }
}

export const authService = new AuthService();
