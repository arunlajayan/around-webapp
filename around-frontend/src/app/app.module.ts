import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  ApolloClientOptions, ApolloLink } from '@apollo/client/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './Module/auth/component/log-in/log-in.component';
import { RegisterComponent } from './Module/auth/component/register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { InMemoryCache } from '@apollo/client/cache';
import { AuthService } from './Module/auth/shared/auth.service';
import { HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { DashboardMainComponent } from './Module/dashboard/component/dashboard-main/dashboard-main.component';
import { ChatListComponent } from './Module/dashboard/component/chat-list/chat-list.component';
import { HomeComponent } from './Module/dashboard/component/home/home.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatComponent } from './Module/dashboard/component/chat/chat.component';
const config: SocketIoConfig = { url: 'localhost:5000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    DashboardMainComponent,
    ChatListComponent,
    HomeComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
