import User from '../User/schema';
import Surgeon from '../Surgeon/schema';
import Treatment from '../Treatment/schema';
import Patient from '../Patient/schema';
import Procedure from '../Procedure/schema';

import resolvers from './resolvers';

import { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} from 'graphql';
import joinMonster from 'join-monster';

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



 const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    me: {
      type: User,
      resolve: resolvers.me
    },
    surgeon: {
      type: Surgeon,
      args: { id: { type: GraphQLID} },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, {}, sql => {
          //sql = sql.replace('JOIN procedure', 'JOIN `procedure`')
          return context.sequelize.query(sql, { type: context.sequelize.QueryTypes.SELECT})
        }, {dialect: 'pg'})
      },
      where: (usersTable, args, context, tables) => {
        if (args.id) return `(${usersTable}.id = ${args.id} OR 1=1)`;
      }
    },
    surgeons: {
      type: new GraphQLList(Surgeon),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, {}, sql => {
          //sql = sql.replace('JOIN procedure', 'JOIN `procedure`')
          return context.sequelize.query(sql, { type: context.sequelize.QueryTypes.SELECT})
        }, {dialect: 'pg'})
      }
    },
    treatment: {
      type: Treatment,
      args: {
        id: { type: GraphQLID }
      }
    },
    treatments: {
      type: new GraphQLList(Treatment),
      args: {
        surgeonId: { type: GraphQLID },
        surgeonName: { type: GraphQLString }
      },
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, {}, sql => {
          //sql = sql.replace('JOIN procedure', 'JOIN `procedure`')
          return context.sequelize.query(sql, { type: context.sequelize.QueryTypes.SELECT})
        }, {dialect: 'pg'})
      },
      where: (usersTable, args, context, tables) => {
        console.log('TABLES:', tables);
        //return `${usersTable}.id = ${context.id}`
      }
    },
    patients: {
      type: new GraphQLList(Patient),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, {}, sql => {
          //sql = sql.replace('JOIN procedure', 'JOIN `procedure`')
          return context.sequelize.query(sql, { type: context.sequelize.QueryTypes.SELECT})
        }, {dialect: 'pg'})
      }
    },

    procedures: {
      type: new GraphQLList(Procedure),
      resolve: (parent, args, context, resolveInfo) => {
        return joinMonster(resolveInfo, {}, sql => {
          //sql = sql.replace('JOIN procedure', 'JOIN `procedure`');
          //sql = sql.replace('FROM procedure', 'FROM `procedure`')
          return context.sequelize.query(sql, { type: context.sequelize.QueryTypes.SELECT})
        }, {dialect: 'pg'})
      },
      args: {
        date: { type: GraphQLString },
        id: { type: GraphQLID }
      },
      where: (procedureTable, args, context, tables) => {
        if (args.date) return `${procedureTable}.date = "${args.date}"`;
        if (args.id) return `${procedureTable}.id = "${args.id}"`;
      }
    }
    /*
    treatmentsForSurgeon: {
      type: new GraphQLList(Treatment),
      args: {
        surgeonId: { type: GraphQLID }
      },
      resolve: resolvers.treatmentsForSurgeon
    }*/
  })
});

export default query;
