
export type RegisterInput = {
  email: string;
  password: string;
  name?: string;
  role?: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    name?: string;
    role: string;
  };
};

export type RefreshTokenInput = {
  refreshToken: string;
};