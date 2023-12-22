import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from "./createUser";

@ObjectType()
export class UserResponse {
  @Field(() => User)
  user: User;

  @Field(() => String)
  token: string;
}
