import User from '../User/schema';
import Surgeon from '../Surgeon/schema';
import Treatment from '../Treatment/schema';
import Procedure from '../Procedure/schema';
import Patient from '../Patient/schema';

//import resolvers from './resolvers';

import { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';
import joinMonster from 'join-monster';

import createAuthorizedGraphQLMutationType from '../../core/graphql/authorized/createAuthorizedGraphQLMutationType';

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



 const mutation = createAuthorizedGraphQLMutationType({
  name: 'Mutation',
  fields: () => ({
    addProcedure: {
      type: Procedure,
      args: {
        treatmentId: { type: GraphQLID },
        surgeonId: { type: GraphQLID },
        patientId: { type: GraphQLID },
        date: { type: GraphQLString }
      },
      resolve: (root, args, context) => {
        const insertConfig = {
          patient_id: args.patientId,
          user_id: args.surgeonId,
          treatment_id: args.treatmentId,
          date: args.date,
        };

        return context.model.Procedure.create(insertConfig);
      }
    },

    addPatient: {
      type: Patient,
      args: {
        name: { type: GraphQLString }
      },
      resolve: (root, args, context) => {
        const insertConfig = {
          name: args.name,
        };

        return context.model.Patient.create(insertConfig);
      }
    },
  })
});

export default mutation;
