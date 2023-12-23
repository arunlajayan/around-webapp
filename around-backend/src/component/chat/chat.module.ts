import { Module, forwardRef } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { Chat, ChatSchema } from 'src/schema/chat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { RoomModule } from '../room/room.module';
import { RoomService } from '../room/room.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
  MongooseModule.forFeature([
    { name: 'Room', schema: RoomModule },
  ]),
  forwardRef(() => RoomModule),
    forwardRef(() => UserModule),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway,RoomService]
})
export class ChatModule {}
