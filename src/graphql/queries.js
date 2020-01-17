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
        username
        email
        avatar
        postTag
        saveTag
        isVerified
        facebook
        twitter
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(fieldsToUpdate: $updateUserInput) {
      username
      email
      avatar
      postTag
      saveTag
      isVerified
      facebook
      twitter
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      username
      email
      avatar
      postTag
      saveTag
      isVerified
      facebook
      twitter
    }
  }
`;

export const RESEND_CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($email: String!) {
    resendConfirmEmail(email: $email) {
      username
      email
      avatar
      postTag
      saveTag
      isVerified
      facebook
      twitter
    }
  }
`;

export const CONFIRM_EMAIL = gql`
  mutation ConfirmEmail($token: String!) {
    confirmEmail(token: $token) {
      username
      email
      avatar
      postTag
      saveTag
      isVerified
      facebook
      twitter
    }
  }
`;
