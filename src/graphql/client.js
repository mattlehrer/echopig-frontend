import { onError } from 'apollo-link-error';
import ApolloClient from 'apollo-boost';
import 'cross-fetch/polyfill';

export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});