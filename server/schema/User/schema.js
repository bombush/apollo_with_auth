import { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from 'graphql';

import resolvers from './resolvers';

const user = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: resolvers.id
    },
    role: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    }
  })
});

export default user;
