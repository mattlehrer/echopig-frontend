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

export const CREATE_POST = gql`
  mutation CreatePost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      _id
      createdAt
      shareURL
      comment
      episode
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

export const TOP_EPISODES = gql`
  query mostPostedEpisodesInTimeframe {
    mostPostedEpisodesInTimeframe(maxEpisodes: 50) {
      _id
      mp3URL
      title
      podcast {
        _id
        title
        genres
        iTunesID
        author
        feedUrl
        artworkUrl600
        collectionExplicitness
      }
    }
  }
`;

export const TOP_EPISODES_IN_GENRE = gql`
  query mostPostedEpisodesInGenreInTimeframe($genre: String!) {
    mostPostedEpisodesInGenreInTimeframe(genre: $genre) {
      _id
      mp3URL
      title
      podcast {
        _id
        title
        iTunesID
        author
        feedUrl
        artworkUrl600
        collectionExplicitness
      }
    }
  }
`;

export const TOP_PODCASTS = gql`
  query mostPostedPodcastsInTimeframe {
    mostPostedPodcastsInTimeframe {
      _id
      title
      iTunesID
      genres
      author
      feedUrl
      artworkUrl600
      collectionExplicitness
    }
  }
`;

export const GET_PODCAST = gql`
  query podcast($podcast: ObjectId!) {
    podcast(podcastId: $podcast) {
      iTunesID
      author
      title
      collectionViewUrl
      feedUrl
      collectionExplicitness
      artworkUrl600
      genres
      _id
    }
  }
`;

export const GET_EPISODE = gql`
  query episode($episode: ObjectId!) {
    episode(episodeId: $episode) {
      _id
      title
      description
      image
      mp3URL
      releaseDate
      duration
      parentalRating
      podcast
    }
  }
`;
