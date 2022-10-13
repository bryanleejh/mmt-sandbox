import { getApiUrl } from './constants';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { logoutHelpers } from './helper';
import { ServerError } from 'apollo-link-http-common';
import mmtSdk from '../mmtSdk';
import { getActiveCountry } from '../utils/country';

const tokenHeaderLink = setContext((_, { headers }) => {
  const token = mmtSdk.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const geidHeaderLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-Global-Entity-ID': getActiveCountry(),
    },
  };
});

const createClient = (uri: string) => {
  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ networkError }) => {
        if (networkError) {
          const { statusCode } = networkError as ServerError;
          if (statusCode === 401) {
            logoutHelpers.deleteToken();
            window.location.href = '/';
            alert('Unauthenticated Request. Please try logging in again.');
          }
        }
      }),
      tokenHeaderLink.concat(geidHeaderLink).concat(
        createUploadLink({
          uri,
        })
      ),
    ]),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
  return client;
};
export const createApolloClient = () => createClient(getApiUrl());
