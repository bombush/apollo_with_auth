import express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { StaticRouter } from 'react-router';

import Layout from '../src/Layout';
import indexRoute from './src/routes/index';

const resolveStatic = (relative) => {
  return fs.realpathSync(path.resolve(__dirname, '../build', relative));
}

// run Express!
const app = express();

app.use('/static', express.static(resolveStatic('static'), { fallthrough: false }));

app.get('*', indexRoute);

app.listen(3333, () => console.log('App listening on port 3333'));
