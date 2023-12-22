import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Room {
  @Field(() => String, )
  id?: string;
  @Field(() => String, )
  name?: string;
  
  
}

@InputType()
export class createRoom {
  @Field(() => String,)
  name: string;

  
}