import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ALL_ROOM } from '../../shared/interfaces/graphql/chat-mutations.graphql';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  rooms: any[] = [];

  constructor(
    private apollo: Apollo
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
}
