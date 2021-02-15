import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_HTTP_ENDPOINT || 'http://localhost:3000/graphql',
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_GRAPHQL_SECRET,
  },
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_GRAPHQL_WS_ENDPOINT || 'ws://localhost:3000/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': process.env.REACT_APP_GRAPHQL_SECRET,
      },
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export default client;
