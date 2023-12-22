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


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    DashboardMainComponent,
    ChatListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
