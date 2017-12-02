import { GraphQLObjectType, defaultFieldResolver } from "graphql";
import { createAuthorizedQueryResolver } from './resolvers';



const nullResolver = () => {};

export default (config, securityResolvers) => {
      const secureFields = (fieldsGenerator) => {
        const fields = fieldsGenerator();
          /**
         * Possible situations:
         * --------------------e
         * 1. Value is optional and not allowed: return null
         * 2. Value is required and not allowed: must return some kind of a default value for the type
         *  - int! : 0
         *  - string!: ''
         *  - object!: this is a bit tricky. Create new object of the type with values filled? @TODO
         *  - do not deny IDs?
         *  - throw on required fields? That sounds pretty consistent...
         * 
         * - throw on denied mutations?
         * 
         * @TODO: Do we need to care if this throws error in the end or not? 
         *        Shouldn't this security measure be just the last defense?
         * 
         * if is an array, filter and call function for each member
         * 
         * - query: can send query and filter after
         * - mutation: cannot send query
         * - implicit or explicit pre/post?
         * - pass in resolver and call again? isn't it a bit too much writing?
         * 
         * I want the application to behave consistently so creating version for mutation and query makes sense 
         * 
         * - @TODO: overwrite default resolver too
         * 
         * preCheck + postCheck? rather not I guess
         */
        const newFields = Object.keys(fields)
        .reduce((fieldCarry, fieldName) => {
          if( typeof(securityResolvers) === 'undefined'
            || typeof(securityResolvers[fieldName]) === 'undefined'
            || securityResolvers[fieldName] === null
            || securityResolvers[fieldName] === false
            || typeof(securityResolvers[fieldName].resolve) !== 'function'
          ) {
            return { ...fieldCarry, [fieldName]: {...fields[fieldName], resolve: nullResolver} };
          };

          //console.log('create secure', defaultFieldResolver);

          return { 
            ...fieldCarry, 
            [fieldName]: {
              ...fields[fieldName], 
              resolve: createAuthorizedQueryResolver(
                securityResolvers[fieldName].resolve,
                fields[fieldName].resolve || defaultFieldResolver, 
              )  
            } 
          };
        }, {})

        return newFields;
      };


      //let fields = {};
      let newFields = null;
      if(!config.fields) newFields = {};
      if(typeof(config.fields) === 'function') newFields = () => secureFields(config.fields);
      else newFields = secureFields(() => config.fields);
  
      /*const fields =
        config.fields 
        &&*/
  
  
        const newConfig = {...config, fields: newFields };
        //console.log('OLD CONFIG:', config);
        //console.log('NEW CONFIG:', newConfig);
        console.log('NEW FIELDS:', newFields);
        //super(newConfig);

        return new GraphQLObjectType(newConfig);
    };