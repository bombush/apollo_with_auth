import { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

import Surgeon from '../Surgeon/schema';

//import joinMonster from 'join-monster';

const treatment = new GraphQLObjectType({
  name: 'Treatment',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    surgeon: {
      type: Surgeon,
      sqlJoin: (treatmentTable, userTable, args) => 
        `${treatmentTable}.user_id = ${userTable}.id`
    },
  }),

  sqlTable: 'treatment',
  uniqueKey: 'id'
});

export default treatment;
