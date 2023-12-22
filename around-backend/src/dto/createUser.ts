import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, )
  id?: string;
  @Field(() => String, )
  username?: string;
  @Field(() => String,)
  password?: string;
  @Field(() => String,)
  email: string;
  
}

@InputType()
export class createUser {
  @Field(() => String,)
  username?: string;
  @Field(() => String,)
  password?: string;
  @Field(() => String,)
  email: string;
  
}


