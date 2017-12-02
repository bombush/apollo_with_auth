import { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

import Surgeon from '../Surgeon/schema';
import createAuthorizedGraphQLQueryType from '../../core/graphql/authorized/createAuthorizedGraphQLQueryType';

//import joinMonster from 'join-monster';

console.log('SURGOEN:', Surgeon);

const treatment = createAuthorizedGraphQLQueryType({
  name: 'Treatment',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString,
      sqlColumn: 'name'
    },
    surgeon: {
      type: Surgeon,
      sqlJoin: (treatmentTable, userTable, args) => 
        `${treatmentTable}.user_id = ${userTable}.id`
    },
  }),

  sqlTable: 'treatment',
  uniqueKey: 'id'
}, {
  id: { resolve: () => true },
  name: { resolve: () => true },
  surgeon: { resolve: () => true }
});

export default treatment;
