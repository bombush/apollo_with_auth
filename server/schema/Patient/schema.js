import { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import joinMonster from 'join-monster';

import Treatment from '../Treatment/schema';
import Surgeon from '../Surgeon/schema';
import Procedure from '../Procedure/schema';
//import resolvers from './resolvers';

const patient = new GraphQLObjectType({
  name: 'Patient',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    procedures: {
      type: new GraphQLList(Procedure),
      
      sqlJoin: (patientTable, procedureTable, args) => 
        `${patientTable}.id = ${procedureTable}.patient_id`
    }
  }),

  sqlTable: 'patient',
  uniqueKey: 'id'
});

export default patient;
