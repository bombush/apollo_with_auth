import React, { Component } from 'react';
import './App.css';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat as concatLinks } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import {
  BrowserRouter as Router
} from 'react-router-dom';

import Layout from './Layout';

// apollo link to log requested operations and returned data
const loggerLink = new ApolloLink((operation, forward) => {
  // log requested operation (this gets called even if ultimately the data is fetched from the cache)
  console.log('OPERATION OUT:', operation);
  return forward(operation)
          .map(data => console.log('DATA IN:', data) || data); // log data in
});
 
const preloadedState = window.__APOLLO_STATE__;

const client = new ApolloClient({
  link: concatLinks(
    loggerLink,
    new HttpLink({ uri: 'http://localhost:3334/graphql'}),
    ),
  cache: new InMemoryCache().restore( preloadedState || {})
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Layout />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
