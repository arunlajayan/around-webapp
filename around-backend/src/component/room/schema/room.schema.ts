import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps : true})
class Room {
  @Prop({unique: true})
  name: string;


}

export type RoomDocument = Room & Document;
export const RoomSchema = SchemaFactory.createForClass(Room);