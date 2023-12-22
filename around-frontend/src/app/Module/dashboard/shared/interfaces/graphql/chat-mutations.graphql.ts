import { gql } from 'apollo-angular';

export const ROOM_CREATE = gql`
mutation createRoom($room: createRoom!) {
  createRoom(room: $room) {
    name
  }
}
`


export const ALL_ROOM = gql`
query {
  
  getMyRoomInfo {
    id
   name
  }
  }
`