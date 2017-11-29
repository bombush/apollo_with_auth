import { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from 'graphql';

import joinMonster from 'join-monster';

import Treatment from '../Treatment/schema';
import Surgeon from '../Surgeon/schema';
import Patient from '../Patient/schema';
//import resolvers from './resolvers';

const procedure = new GraphQLObjectType({
  name: 'Procedure',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    treatment: {
      type: Treatment,
      sqlJoin: (procedureTable, treatmentTable, args) => 
        `${procedureTable}.treatment_id = ${treatmentTable}.id`
    },
    surgeon: {
      type: Surgeon,
      sqlJoin: (procedureTable, surgeonTable, args) => 
        `${procedureTable}.treatment_id = ${surgeonTable}.id`
    },
    patient: {
      type: Patient,
      sqlJoin: (procedureTable, patientTable, args) => 
        `${procedureTable}.treatment_id = ${patientTable}.id`
    },
    date: {
      type: GraphQLString
    }
  }),

  sqlTable: 'procedure',
  uniqueKey: 'id'
});

export default procedure;
