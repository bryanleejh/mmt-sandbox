import { getApiUrl } from './constants';
import { ApolloClient, ApolloLink, InMemoryCache, ServerError } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { logoutHelpers } from './helper';
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any
      ),
    ]),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
  return client;
};

export const createApolloClient = () => createClient(getApiUrl());
