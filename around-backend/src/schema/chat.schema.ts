// import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
// import {HydratedDocument, now} from 'mongoose';
// import * as mongoose from 'mongoose';
// import { User } from './user.schema';
// import { Conversation } from './Conversation.schema';

// export type ChatDocument = HydratedDocument<Chat>;

// @Schema({timestamps: true})
// export class Chat {

//   @Prop({required: true})
//   chat: string

//   @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Conversation'})
//   conversation: Conversation

//   @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
//   userFrom: User

//   @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
//   userTo: User

//   @Prop({required: true, default: now()})
//   createdAt: Date

//   @Prop({default: now()})
//   updatedAt: Date
// }

// export const ChatSchema = SchemaFactory.createForClass(Chat);

// import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
// import { Types } from 'mongoose';

// @Schema({ timestamps: true })
// export class Chat {
//     @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
//     author: Types.ObjectId
//     @Prop({ type: String, required: true })
//     content: string
// }

// export const ChatSchema = SchemaFactory.createForClass(Chat);
// export type ChatDocument = Chat & Document;

import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, now} from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Room } from 'src/dto/createRoom';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({timestamps: true})
export class Chat {

  @Prop({required: true})
  name: string

  @Prop({required: true})
  text: String

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user_id: User

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Room'})
  room_id: Room

  @Prop({required: true, default: now()})
  createdAt: Date

  @Prop({default: now()})
  updatedAt: Date
}

export const ChatSchema = SchemaFactory.createForClass(Chat);