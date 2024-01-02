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
    console.log(roomService.username)
    this.roomForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  async createRoom(): Promise<void> {
    if (this.roomForm.valid) {
      const room = this.roomForm.value;

      try {
        const createdRoom = await this.roomService.createRoom(room);
        console.log('Room created:', createdRoom);
      } catch (error) {
        console.error('Error creating room:', error);
      }
    }
  }
}
