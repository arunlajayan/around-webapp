import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/dto/createUser';
import { UserDocument } from 'src/schema/user.schema';
import { hash, compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { loginUser } from 'src/dto/loginUser';
import { UserResponse } from 'src/dto/Response';

@Injectable()
export class UserService {
    private saltRounds = 10;
    constructor(@InjectModel('User') private userModel: Model<UserDocument>) { }
    
    async create(createUserDto: User): Promise<User> {
        try {
          if (createUserDto.password) {
            createUserDto.password = await hash(
              createUserDto.password,
              this.saltRounds,
            );
          }
          const newUser = new this.userModel(createUserDto);
          return newUser.save();
        } catch (err) {
          return err;
        }
        
    }
    


 
    
    async login(auth: loginUser): Promise<UserResponse> {
      try {
        const user = await this.userModel.findOne({ email: auth.email });
        if (user && (await compare(auth.password, user.password))) {
          const jwtPayload = {
            id: user.id,
            email: user.email,
          };
    
          const secretKey = 'yourSecretKey'; 
          const token = jwt.sign(jwtPayload, secretKey);
    
          return {
            user,token
          };
        } else {
          throw "login failed";
        }
      } catch (err) {
        return err;
      }
    }
    
      
    async getMyInfo(): Promise<User[]> {
        return this.userModel.find()
      }
    
  async findById(id: Types.ObjectId | string): Promise<User> {
        console.log(id)
        return this.userModel.findById({ _id: id });
      }
}
