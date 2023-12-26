import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Module/auth/shared/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  newMessage: FormGroup;
  constructor(
    private fb: FormBuilder, private auth: AuthService) {
      this.newMessage = this.fb.group({
        name: ['', [Validators.required]],
      });
  }
  ngOnInit(): void {
    this.auth.connect("arun","65846348c4948fc3cf4c94ed","65813878841fbd7b3920041e")
  }
  sendMessage() {
    if (this.newMessage.valid) {
      const msg = this.newMessage.value;

      try {
        this.auth.send(msg,"65846348c4948fc3cf4c94ed")
      } catch (error) {
        
      }
      
    }
 }
}
