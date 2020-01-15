import { gql } from 'apollo-boost';

export const GET_PODCASTS = gql`
  {
    podcasts {
      _id
      title
      genres
    }
  }
`;

export const LOGIN = gql`
  mutation login($loginUser: LoginUserInput!) {
  login(user: $loginUser) {
    token
    user {
      username, email, postTag, saveTag, isVerified
    }
  }
}
`;

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(
      createUserInput: $createUserInput
    ) {
      username, email, postTag, saveTag, isVerified
    }
  }
`;