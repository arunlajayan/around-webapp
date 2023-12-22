import { User } from "src/app/Module/user/shared/model/user.model";



export interface RegisterResponse {
  errors?: unknown;
  data?: {
    signup: {
      accessToken: string;
      refreshToken: string;
      user: User;
    };
  };
}