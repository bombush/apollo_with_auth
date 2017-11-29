import { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

import Treatment from '../Treatment/schema';
import resolvers from './resolvers';

const surgeon = new GraphQLObjectType({
  name: 'Surgeon',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    username: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    treatments: {
      type: new GraphQLList(Treatment),
      resolve: resolvers.treatments
    }
  })
});

export default surgeon;
