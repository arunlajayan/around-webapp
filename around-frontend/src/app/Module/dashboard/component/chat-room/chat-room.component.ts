import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ALL_ROOM } from '../../shared/interfaces/graphql/chat-mutations.graphql';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  

}
