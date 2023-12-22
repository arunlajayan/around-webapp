import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/register', 
    pathMatch: 'full'
},
  {
    path: 'auth',
     loadChildren: () => import('./Module/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
     loadChildren: () => import('./Module/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
