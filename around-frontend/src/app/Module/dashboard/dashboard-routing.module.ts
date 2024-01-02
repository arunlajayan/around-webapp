import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMainComponent } from './component/dashboard-main/dashboard-main.component';
import { HomeComponent } from './component/home/home.component';
import { ChatComponent } from './component/chat/chat.component';





const routes: Routes = [
 
  {
      path: '',
      component:HomeComponent 
  },
  {
    path: ':room_id/:room_name',
    component:ChatComponent 
},

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
