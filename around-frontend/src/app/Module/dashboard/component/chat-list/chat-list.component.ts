import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ALL_ROOM } from '../../shared/interfaces/graphql/chat-mutations.graphql';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  rooms: any[] = [];
  messages: any[] = [];
  room_id: string = 'your_room_id';
  constructor(
    private router: Router,
    private apollo: Apollo,
    private socket: Socket
  ) {
    
  }
  ngOnInit(): void {
    
  
    this.apollo.watchQuery({
      query: ALL_ROOM
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.rooms = data.getMyRoomInfo;
      console.log(this.rooms);
    }
    );
  }
  navigateToChat(roomId: string, roomName: string): void {
    this.router.navigate(['/dashboard', roomId, roomName]);
  }
}
