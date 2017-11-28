import { makeExecutableSchema } from 'graphql-tools';

import surgeonSchema from './Surgeon/schema.graphql';
import treatmentSchema from './Treatment/schema.graphql';
import userSchema from './User/schema.graphql';
import query from './query.graphql';

import resolvers from './resolvers';


const typeDefs = 
  surgeonSchema
  + '\n'
  + treatmentSchema
  + '\n'
  + userSchema
  + '\n'
  + query;

console.log('TYPEDEFS: ', typeDefs);

export default makeExecutableSchema({ typeDefs, resolvers });
