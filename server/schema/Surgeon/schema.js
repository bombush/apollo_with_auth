import { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';

import joinMonster from 'join-monster';

import Treatment from '../Treatment/schema';
import Procedure from '../Procedure/schema';
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
      
      sqlJoin: (parentTable, childTable, args) => `${parentTable}.id = ${childTable}.user_id`
    },
    procedures: {
      type: new GraphQLList(Procedure),
      
      sqlJoin: (patientTable, procedureTable, args) => 
        `${patientTable}.id = ${procedureTable}.patient_id`
    }
  }),

  sqlTable: 'user',
  uniqueKey: 'id'
});

export default surgeon;
