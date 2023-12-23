export class User {
    socket_id: string;
    name: string;
    room_id: string;
    user_id: string;
  
    constructor({ socket_id, name, room_id, user_id }: { socket_id: string; name: string; room_id: string; user_id: string }) {
      this.socket_id = socket_id;
      this.name = name;
      this.room_id = room_id;
      this.user_id = user_id;
    }
  }