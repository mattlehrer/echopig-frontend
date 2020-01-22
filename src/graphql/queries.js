import { gql } from 'apollo-boost';

// export const GET_PODCASTS = gql`
//   {
//     podcasts {
//       _id
//       title
//       genres
//     }
//   }
// `;

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

export const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      username
      name
      avatar
      posts {
          _id
          episode
          comment
          updatedAt
      }
      createdAt
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

export const DELETE_POST = gql`
  mutation DeletePost($postId: ObjectId!) {
    deletePost(postId: $postId)
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
  query mostPostedEpisodesInTimeframe($maxEpisodes: Int) {
    mostPostedEpisodesInTimeframe(maxEpisodes: $maxEpisodes) {
      _id
      title
      image
      podcast
      releaseDate
      posts
    }
  }
`;

export const TOP_EPISODES_IN_GENRE = gql`
  query mostPostedEpisodesInGenreInTimeframe($genre: String!) {
    mostPostedEpisodesInGenreInTimeframe(genre: $genre) {
      _id
      title
      description
      posts
      releaseDate
      podcast
    }
  }
`;

export const TOP_PODCASTS = gql`
  query mostPostedPodcastsInTimeframe($maxPodcasts: Int) {
    mostPostedPodcastsInTimeframe(maxPodcasts: $maxPodcasts) {
      _id
      title
      iTunesID
      genres
      author
      feedUrl
      artworkUrl100
      artworkUrl600
      posts
      collectionExplicitness
    }
  }
`;

export const GET_PODCAST_BY_ID = gql`
  query podcastById($podcast: ObjectId!) {
    podcastById(podcastId: $podcast) {
      iTunesID
      author
      title
      collectionViewUrl
      feedUrl
      collectionExplicitness
      artworkUrl600
      genres
      _id
      episodes {
        _id
        title
        description
        image
        mp3URL
        releaseDate
      }
    }
  }
`;

export const GET_PODCAST = gql`
  query podcast($iTunesId: Int!) {
    podcast(iTunesId: $iTunesId) {
      iTunesID
      author
      title
      collectionViewUrl
      feedUrl
      collectionExplicitness
      artworkUrl600
      genres
      _id
      episodes {
        _id
        title
        description
        image
        mp3URL
        releaseDate
      }
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
