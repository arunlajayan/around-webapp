import { Resolver,Mutation, Args, Query } from '@nestjs/graphql';
import { RoomService } from './room.service';
import { Room, createRoom } from 'src/dto/createRoom';

@Resolver()
export class RoomResolver {
    constructor(private readonly room: RoomService) { }

    @Mutation(() => Room)
    async createRoom(@Args('room') newUser: createRoom): Promise<Room> {
      console.log(newUser)
    return await this.room.create(newUser);
  }
  @Query(() => Room)
  async findRoom(@Args('id') id: string): Promise<Room> {
    console.log(id)

    return this.room.findById(id);
  }

  @Query(() => [Room])
    async getMyRoomInfo(): Promise<Room[]> {
      return this.room.getMyInfo();
    }
}
