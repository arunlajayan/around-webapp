import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import {   User, createUser } from 'src/dto/createUser';
import { loginUser } from 'src/dto/loginUser';
import { UserService } from './user.service';
import { UserResponse } from 'src/dto/Response';
import { AuthGuard } from './user.guard';
import { UseGuards } from '@nestjs/common';


@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) { }
  
    @Mutation(() => User)
    async createUser(@Args('user') newUser: createUser): Promise<User> {
      console.log(newUser)
    return await this.userService.create(newUser); 
  }
  @UseGuards(new AuthGuard())
  @Query(() => [User])
    async getMyInfo(): Promise<User[]> {
      return this.userService.getMyInfo();
    }
  
    @Query(() => User, { nullable: true })
    async getInfoById(@Args('id') id: string): Promise<User | null> {
      
      return this.userService.findById(id);
    }
   
    @Mutation(() => UserResponse)
    async login(@Args('auth') auth: loginUser): Promise<UserResponse> {
      return await this.userService.login(auth);
    }
}
