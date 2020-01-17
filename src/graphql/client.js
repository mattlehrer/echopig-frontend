import ApolloClient from 'apollo-boost';
import 'cross-fetch/polyfill';

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});

export const AuthClient = (token) => new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  headers: {
    authorization: `Bearer ${token}`,
  }
});
