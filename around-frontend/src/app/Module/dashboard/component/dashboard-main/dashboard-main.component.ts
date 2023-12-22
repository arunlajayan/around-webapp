import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../shared/dashboard.service';
import { ALL_ROOM } from '../../shared/interfaces/graphql/chat-mutations.graphql';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {
  constructor(
    private dashboard: DashboardService,
    private apollo: Apollo
  ) {
    
  }
  ngOnInit(): void {
    
  }
  room: string = '';
  onButtonClick() {
    this.dashboard.createRoom(this.room).subscribe(
      (data) => {
        
        console.log('Room create successful:', data);
        window.location.reload()
        },

      
      (error) => {
        console.error('Login error:', error);
       
      }
    );
  }
}
