import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent  implements OnInit {
  @Input() message: any;
  @Input() currentUid: any = localStorage.getItem("id")

  get isCurrentUser(): boolean {
    return this.message.user_id === this.currentUid;
  }

  constructor() {}
  ngOnInit(): void {
 console.log("msg",this.message)
    
  }
}
