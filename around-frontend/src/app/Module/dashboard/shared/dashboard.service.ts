import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { catchError, map, throwError } from 'rxjs';
import { ALL_ROOM, ROOM_CREATE } from './interfaces/graphql/chat-mutations.graphql';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apollo: Apollo) // private authRepository: AuthRepository,
  { }

  createRoom(name: String) {
    return this.apollo.mutate({
      mutation: ROOM_CREATE,
      variables: {
        room: {
          name
        },
      },
    }).pipe(
      map(({ data }: any) => {
        return data?.createRoom
        // console.log(data)
      }),
      catchError((error) => {
        console.error('GraphQL Mutation Error:', error);
        return throwError(error);
      })
    );

  }

  getAllRoom() {
    this.apollo.watchQuery({
      query: ALL_ROOM
    }).valueChanges.subscribe(({ data, error }: any) => {
      console.log(data)
    }
    );
  }

}
