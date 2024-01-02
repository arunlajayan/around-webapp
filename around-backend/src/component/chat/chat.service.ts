import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/dto/User.model';
import { Chat } from 'src/schema/chat.schema';


@Injectable()
export class ChatService {
    private users: User[] = [];
    constructor(@InjectModel('Chat') private readonly messageModel: Model<Chat>) {}
    async createMessage(data: { name: string; user_id: string; text: string; room_id: string }): Promise<Chat> {
        
      const createdMessage = new this.messageModel(data);
      console.log(createdMessage)
        return createdMessage.save();
      }
    
      async getMessagesByRoom(room_id: string): Promise<Chat[]> {
        return this.messageModel.find({ room_id }).exec();
      }
  addUser(user: User): { error: string | null; user: User | null } {
        
        const existingUser = this.users.find((u) => u.user_id === user.user_id && u.room_id === user.room_id);
        if (existingUser) {
          return { error: 'User already exists in the room', user: null };
        }
    
        this.users.push(user);
        return { error: null, user };
      }
    
      removeUser(socketId: string): User | null {
        const index = this.users.findIndex((user) => user.socket_id === socketId);
    
        if (index !== -1) {
          const removedUser = this.users.splice(index, 1)[0];
          return removedUser;
        }
    
        return null;
      }
      getUser(socket_id) {
        return this.users.find(u => u.socket_id === socket_id);
      }
}
