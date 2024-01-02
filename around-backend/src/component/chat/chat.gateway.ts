import { WebSocketGateway, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { RoomService } from '../room/room.service';
import { ChatService } from './chat.service';
import { Room } from 'src/dto/createRoom';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messageService: ChatService, private readonly roomService: RoomService) {}

  handleConnection(client: Socket): void {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createRoom')
  async handleCreateRoom(client: Socket, roomName: Room): Promise<void> {
    const room = await this.roomService.create(roomName);
    client.emit('room-created', room);
  }

  @SubscribeMessage('join')
  async handleJoinRoom(client: Socket, payload: { name: string; room_id: string; user_id: string }): Promise<void> {
    const { name, room_id, user_id } = payload;
   
    const { error, user } = await this.messageService.addUser({ socket_id: client.id, name, room_id, user_id });
    client.join(room_id);
    if (error) {
      console.log('join error', error);
    } else {
      console.log('join user', user);
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(@ConnectedSocket() client: Socket, payload: { text: string; room_id: string }): Promise<void> {
    if (!payload || !payload.text || !payload.room_id) {
      console.error('Invalid payload:', payload);
      return; // or handle the error in a way that fits your application
    }
  
    const { text, room_id } = payload;
    console.log('payload', payload);
  
    // Rest of your code to process the message
    const user = await this.messageService.getUser(client.id);
    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: text,
    };
    const message = await this.messageService.createMessage(msgToStore);
    client.to(room_id).emit('message', message);
  }
  

  @SubscribeMessage('getMessagesHistory')
  async handleGetMessagesHistory(client: Socket, room_id: string): Promise<void> {
    const messages = await this.messageService.getMessagesByRoom(room_id);
    client.emit('output-messages', messages);
  }

  @SubscribeMessage('disconnect')
  async handleDisconnectEvent(client: Socket): Promise<void> {
    const user = await this.messageService.removeUser(client.id);
    if (user) {
      console.log(`${user.name} has left the room`);
      client.leave(user.room_id);
    }
  }


}
