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
      args: { date: { type: GraphQLString } },

      sqlJoin: (patientTable, procedureTable, args) => {
        if(args.date) {
          return `${patientTable}.id = ${procedureTable}.user_id AND ${procedureTable}.date='${args.date}'`;
        }

        return `${patientTable}.id = ${procedureTable}.user_id`;
      }
    }
  }),

  sqlTable: 'user',
  uniqueKey: 'id'
});

export default surgeon;
