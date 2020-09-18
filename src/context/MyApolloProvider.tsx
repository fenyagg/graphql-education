import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import React, { FC } from 'react';
import { useSnackbar } from 'notistack';

const httpLink = new HttpLink({
  uri: 'https://graphql.anilist.co',
  /*headers: {
    token: 'test',
  },*/
});

export const MyApolloProvider: FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    // my error handling logic
    if (graphQLErrors) {
      const errorString = graphQLErrors.map((error) => error.message);
      enqueueSnackbar(errorString, {
        variant: 'error',
      });
    }
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(httpLink),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
