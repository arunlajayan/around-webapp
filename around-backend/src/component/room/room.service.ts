import { Injectable } from '@nestjs/common';
import {  RoomDocument } from './schema/room.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room, createRoom } from 'src/dto/createRoom';

@Injectable()
export class RoomService {
    constructor(
        @InjectModel('Room')
        private readonly RoomModel: Model<RoomDocument>,
   ) { }
    async create(value: Room): Promise<createRoom> {
     //    const oldRoom = await this.find(value);
     //    if (oldRoom) {
     //         return oldRoom;
     //    }
        const activity = new this.RoomModel({
             name: value.name,
        });
        await activity.save();
        return activity;
    }
    
     async find(value: Room): Promise<Room> {
         console.log(value)
        return await this.RoomModel.findOne({ name: value.name });
     }
     async findById(id: Types.ObjectId | string): Promise<Room> {
          console.log(id)
          return this.RoomModel.findById({ _id: id });
        }
     async getMyInfo(): Promise<Room[]> {
          return this.RoomModel.find()
        }
}
