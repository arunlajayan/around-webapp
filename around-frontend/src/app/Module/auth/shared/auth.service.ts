import { Injectable } from '@angular/core';

import { RegisterPayload } from './interfaces/register-payload.interface';
;
import { Observable, catchError, map, throwError } from 'rxjs';
import { RegisterResponse } from './interfaces/register-response.interface';
import { AuthUserData } from './interfaces/register-data.interface';
import { ApolloQueryResult } from '@apollo/client/core';
import { LogInResponse } from './interfaces/log-in-response.interface';
import { Apollo } from 'apollo-angular';
import { LOGIN_USER_MUTATION, USER_LOGIN, USER_REGISTER } from './interfaces/graphql/auth-mutations.graphql';
import { LoginPayload } from './interfaces/login-payload.interface';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo,private socket: Socket) // private authRepository: AuthRepository,
  {}

  createUser(user: RegisterPayload):Observable<AuthUserData>{
   return this.apollo.mutate({
      mutation: USER_REGISTER,
      variables: {
        username: user.username,
      email: user.email,
      password: user.password,
      }
   }).pipe(
    map(({ data }: any) => {
      console.log(data);
      const authUserData: AuthUserData = data?.createUser;
      return authUserData;
    }),
    catchError((error) => {
      console.error('GraphQL Mutation Error:', error);
      return throwError(error);
    })
    );  
  }
  // login(user: LoginPayload): Observable<{ email: string, password: string }> {
  //   console.log(user);
  //   return this.apollo.mutate({
  //     mutation: USER_LOGIN,
  //     variables: {
  //       email: user.email,
  //       password: user.password,
  //     }
  //   }).pipe(
  //     map(({ data }: any) => {
  //       console.log(data);
  //       const authUserData = data?.login; // Adjust the property name based on your server response
  //       return authUserData;
  //     }),
  //     catchError((error) => {
  //       console.error('GraphQL Mutation Error:', error);
  //       return throwError(error);
  //     })
  //   );
  // }
  
  login(email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: LOGIN_USER_MUTATION,
      variables: {
        auth: {
          email,
          password,
        },
      },
    }).pipe(
      map(({ data }: any) => {
        data?.login
        console.log(data)
      }),
      catchError((error) => {
        console.error('GraphQL Mutation Error:', error);
        return throwError(error);
      })
    );
  }

  createRoom(room: any): void {
    this.socket.emit('createRoom', room, (response: { error: any; }) => {
      if (response.error) {
       console.log("res",response)
      }
    });
  }

  connect(user:string,userID: string, roomId: string): void {
    this.socket.emit('join', {name: user, roomId, user_id:userID});
  }
  send(msg: string, room_id: string): void {
    const payload = {
      name: 'John Doe',
      user_id: '123456',
      text: 'Hello, world!',
      room_id: 'your_room_id'
    };
    this.socket.emit('sendMessage', payload);
    this.socket.on('message', (message: any) => {
      console.log('Received message:', message);
      // Handle the received message here
    });
}
}
