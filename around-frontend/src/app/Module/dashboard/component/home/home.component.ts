// home.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Module/auth/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  roomForm: FormGroup;

  constructor(private fb: FormBuilder, private roomService: AuthService) {
    this.roomForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  async createRoom(): Promise<void> {
    if (this.roomForm.valid) {
      const room = this.roomForm.value;

      try {
        // Call the room service to create the room
        const createdRoom = await this.roomService.createRoom(room);

        // Handle success: Room created successfully
        console.log('Room created:', createdRoom);
        // You can perform additional actions or navigate to a different page
      } catch (error) {
        // Handle error: Something went wrong during room creation
        console.error('Error creating room:', error);
        // You can show an error message or perform other error-handling actions
      }
    }
  }
}
