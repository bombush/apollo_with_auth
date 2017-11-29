import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

/*
import surgeonSchema from './Surgeon/schema.graphql';
import treatmentSchema from './Treatment/schema.graphql';
import userSchema from './User/schema.graphql';
import query from './query.graphql';
import resolvers from './resolvers';*/
import Query from './Query/schema';


const schema = new GraphQLSchema({
  query: Query
});

export default schema;

/*const typeDefs = 
  surgeonSchema
  + '\n'
  + treatmentSchema
  + '\n'
  + userSchema
  + '\n'
  + query;

//console.log('TYPEDEFS: ', typeDefs);

export default makeExecutableSchema({ typeDefs, resolvers });*/
