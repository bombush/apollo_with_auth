import { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

import joinMonster from 'join-monster';

import Treatment from '../Treatment/schema';
import Procedure from '../Procedure/schema';
import resolvers from './resolvers';
//import  SecureGraphQLObjectType from '../../core/graphql/SecureGraphQLObjectType';
import createSecureGraphQLObjectType from '../../core/graphql/authorized/createAuthorizedGraphQLObjectType';

const PageInfo = new GraphQLObjectType({
  name: 'PageInfo',
  fields: () => ({
    hasNextPage: { type: GraphQLBoolean }
  })
});

const ProcedureEdge = new GraphQLObjectType({
  name: 'ProcedureEdge',
  fields: () => ({
    cursor: { type: GraphQLString },
    node: { type: Procedure }
  })
});

const ProcedureConnection = new GraphQLObjectType({
  name: 'ProcedureConnection',
  fields: () => ({
    pageInfo: { type: PageInfo },
    edges: { type: new GraphQLList(ProcedureEdge) },
    total: { type: GraphQLInt }
  })
});

const surgeon = createSecureGraphQLObjectType({
  name: 'Surgeon',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      //resolve: () => () => true,
      // resolve: (root, data) => console.log('DATA:', root) || root.username,
      sqlColumn: 'username'
    },
    name: {
      type: GraphQLString,
      sqlColumn: 'name'
    },
    treatments: {
      type: new GraphQLList(new GraphQLNonNull(Treatment)),
      
      sqlJoin: (parentTable, childTable, args) => `${parentTable}.id = ${childTable}.user_id`,
    },
    /*
    procedures: {
      type: new GraphQLList(Procedure),
      args: { date: { type: GraphQLString } },

      sqlJoin: (patientTable, procedureTable, args, context, ast) => {
        const join = (() => {
          if(args.date) {
            return `${patientTable}.id = ${procedureTable}.user_id AND ${procedureTable}.date='${args.date}'`;
          }

          return `${patientTable}.id = ${procedureTable}.user_id`;
        })();

        return `${join}`;
      },*/
      /*
      sqlBatch: {
        thisKey: 'user_id',
        parentKey: 'id'
      }*/
      procedures: {
        type: ProcedureConnection,
        args: { 
          date: { type: GraphQLString },
          first: { type: GraphQLInt },
          after: { type: GraphQLString }
        },
  
        sqlJoin: (patientTable, procedureTable, args, context, ast) => {
          const join = (() => {
            if(args.date) {
              return `${patientTable}.id = ${procedureTable}.user_id AND ${procedureTable}.date='${args.date}'`;
            }
  
            return `${patientTable}.id = ${procedureTable}.user_id`;
          })();
  
          return `${join}`;
        },

        sqlPaginate: true, 

        resolve: (root, data) => console.log('DATA:', data) || root.procedures,
        //sortKey: 'date'
        /*orderBy: {
          date: 'desc'
        }*/
        sortKey: {
          order: 'desc',
          key: [ 'id' ]
        },
    }
  }),

  sqlTable: '"user"',
  uniqueKey: 'id'
}, {
    id: { 
      resolve: () => true
    },
    name: { 
      resolve: () => true
    },
    username: { 
      resolve: username => username === 'tester' ? true : false
    },
    treatments: {
      resolve: treatment => console.log('Treatment:', treatment) || true
    },
    procedures: {
      resolve: () => true
    }
});

export default surgeon;
