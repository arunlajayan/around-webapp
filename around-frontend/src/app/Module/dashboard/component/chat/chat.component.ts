import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Module/auth/shared/auth.service';
import { Location } from '@angular/common';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  newMessage: FormGroup;
  @Input() messages:  any[] = [];
  room_id: string = 'your_room_id';
  public currentUrl = ''
  public urlParts = ''
  constructor(
    private socket: Socket,
    private fb: FormBuilder, private location: Location, private auth: AuthService, private router: Router) {
      this.newMessage = this.fb.group({
        name: ['', [Validators.required]],
      });
  }
  
  ngOnInit(): void {
    
    this.currentUrl = this.location.path();
    this.urlParts = this.currentUrl.split('/')[2];
    this.socket.emit('getMessagesHistory', this.urlParts);

    this.socket.on('output-messages', (messages: any[]) => {
      this.messages = messages;
      console.log("message",messages)
    });
    const username: any = localStorage.getItem("username")
    const id: any = localStorage.getItem("id")
    this.auth.connect(username,id, this.urlParts)
  }
  sendMessage() {
    if (this.newMessage.valid) {
      const msg = this.newMessage.value;

      try {
        this.auth.send(msg.name,this.urlParts)
      } catch (error) {
        
      }
      
    }
 }
}
