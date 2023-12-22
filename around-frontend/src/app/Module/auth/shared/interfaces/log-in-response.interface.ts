import { User } from "src/app/Module/user/shared/model/user.model";

export interface LogInResponse {
  errors?: unknown;
  data?: {
    login: {
      accessToken: string;
      refreshToken: string;
      user: User;
    };
  };
}