import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, now} from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Conversation } from './Conversation.schema';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({timestamps: true})
export class Chat {

  @Prop({required: true})
  chat: string

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Conversation'})
  conversation: Conversation

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  userFrom: User

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  userTo: User

  @Prop({required: true, default: now()})
  createdAt: Date

  @Prop({default: now()})
  updatedAt: Date
}

export const ChatSchema = SchemaFactory.createForClass(Chat);