import { GraphQLObjectType, defaultFieldResolver } from "graphql";

const createSecureResolver =
(securityConditionPost, originalResolver) =>
    (parent, args, context, resolveInfo) => {
      if(!securityConditionPost) return null;

      //console.log('RESOLVE INFO:', resolveInfo);
      //console.log('PARENT', parent);

      const value = originalResolver(parent, args, context, resolveInfo);

      if(securityConditionPost(parent, args, context, resolveInfo)) {
        return value;
      }

      if(/!$/.test(resolveInfo.returnType)) {
        throw new Error(`Access denied on a non-null field "${resolveInfo.fieldName}" on object of type "${resolveInfo.parentType}".`);
      }

      console.log(`A value of field "${resolveInfo.fieldName}" on object of type "${resolveInfo.parentType}" was filtered by authorization.`);
      return null;
      //console.log('RESOLVER:', originalResolver);
      //console.log('SOURCE:', parent);
      //console.log('RESOLVED VALUE:', value);
      //return value;

  // if is GraphQL non null throw
  // if is an array of GraphQL non null, throw
}

const nullResolver = () => {};

export default (config, securityResolvers) => {
  
      let fields = {};
      if(!config.fields) fields = {};
      if(typeof(config.fields) === 'function') fields = config.fields();
      else fields = config.fields;
  
      /*const fields =
        config.fields 
        &&*/
  
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
            return { ...fieldCarry, [fieldName]: {...fields[fieldName], resolve: defaultFieldResolver} };
          };

          console.log('create secure', defaultFieldResolver);
  
          return { 
            ...fieldCarry, 
            [fieldName]: {
              ...fields[fieldName], 
              resolve: createSecureResolver(
                securityResolvers[fieldName].resolve,
                fields[fieldName].resolve || defaultFieldResolver, 
              )  
            } 
          };
        }, {})
  
        const newConfig = {...config, fields: () => newFields };
        //console.log('OLD CONFIG:', config);
        //console.log('NEW CONFIG:', newConfig);
        //super(newConfig);

        return new GraphQLObjectType(newConfig);
    };