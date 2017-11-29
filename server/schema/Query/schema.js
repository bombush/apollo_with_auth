import User from '../User/schema';
import Surgeon from '../Surgeon/schema';
import Treatment from '../Treatment/schema';

import resolvers from './resolvers';

import { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

/**
 *  type Query {
    me: User 
    surgeon: Surgeon
    surgeons: [Surgeon]
    treatment(id: ID): Treatment
    treatments: [Treatment]
    treatmentsForSurgeon(surgeonId: ID): [Treatment] 
  }
 */



 const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    me: {
      type: User,
      resolve: resolvers.me
    },
    surgeon: {
      type: Surgeon,
    },
    surgeons: {
      type: new GraphQLList(Surgeon),
      resolve: resolvers.surgeons
    },
    treatment: {
      type: Treatment,
      args: {
        id: { type: GraphQLID }
      }
    },
    treatments: {
      type: new GraphQLList(Treatment)
    },
    treatmentsForSurgeon: {
      type: new GraphQLList(Treatment),
      args: {
        surgeonId: { type: GraphQLID }
      },
      resolve: resolvers.treatmentsForSurgeon
    }
  })
});

export default query;
