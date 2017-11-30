import Express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'apollo-server-express';
import { graphiqlExpress } from 'apollo-server-express/dist/expressApollo';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import cors from 'cors';

import mockModerator from './mockUsers/moderator';
import mockGuest from './mockUsers/guest';
import schema from './schema/schema';
//import connectMongo from './mongo-connector';

import Sequelize from 'sequelize';
import prepareRepositories from './db.js';

const sequelize = new Sequelize(
  {
    database: 'apollo_mock',
    username: 'postgres',
    password: 'imolol',
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    //socketPath: '/var/run/mysqld/mysqld.sock',
   // timezone : "+01:00",
  }
);

const model = prepareRepositories(Sequelize, sequelize);

const start = async () => {
  const app = Express();
  app.use(cors());

  app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema,
    context: { 
      model, 
      sequelize,
      user: mockModerator//mockGuest//mockGuest // mockModerator // the logged in user (can be a user or a Guest)
    }
  }));

  const PORT = 3334;
  
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
  }));

  const server = createServer(app);
  server.listen(PORT, () => {
    SubscriptionServer.create(
      {execute, subscribe, schema},
      {server, path: '/subscriptions'}
    );
    console.log(`GraphQL server running on port ${PORT}.`);
  });
}

start();
