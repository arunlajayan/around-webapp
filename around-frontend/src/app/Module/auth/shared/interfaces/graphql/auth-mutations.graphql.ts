import { gql } from 'apollo-angular';

export const USER_LOGIN = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(auth: {email:$email, password: $password}) {
    
    email
    password
  }
}
`;

export const USER_REGISTER = gql`
  mutation CreateUser($username:String!,$email: String!, $password: String!) {
  createUser(user:  {username: $username,email:$email, password: $password}) {
    username
    email
    password
  }
}
`;

export const GET_DATA = gql`
query GetMyInfo {
  getMyInfo {
    username
    email
  }
}
`
export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($auth: loginUser!) {
    login(auth: $auth) {
      user {
        id
        email
        username
      
      }
      token
    }
  }
`;