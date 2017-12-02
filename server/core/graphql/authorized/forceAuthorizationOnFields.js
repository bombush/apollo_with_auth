import { defaultFieldResolver } from "graphql";
import { nullResolver } from './resolvers';

/* 
  * The original fields generator must be wrapped in yet another function
  * because of circular dependencies in imported modules when setting up
  * the schema. The fieldsGenerator must by *lazily* evaluated when the GraphQL
  * object is first resolved.
  *
  * @TODO: make thunked authorizationSchema possible?
  */
  const forceAuthorizationOnFields = createAuthorizedResolver => (fieldsGenerator, authorizationSchema) => {
    const originalFields = fieldsGenerator();
    if(!originalFields) {
      throw new Error(
        'GraphQLObject fields must be an object with key:value pairs or a thunk that returns such an object'
      );
    }

    /**
     * Possible situations:
     * --------------------
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
    const newFields = Object.keys(originalFields)
      .reduce((fieldCarry, fieldName) => {
        let authorizationCallback = null;

        if( typeof(authorizationSchema) === 'undefined'
          || typeof(authorizationSchema[fieldName]) === 'undefined'
          || authorizationSchema[fieldName] === null
          || authorizationSchema[fieldName] === false
          || typeof(authorizationSchema[fieldName].resolve) !== 'function'
        ) {
          authorizationCallback = null;
        
        } else {
          authorizationCallback = authorizationSchema[fieldName].resolve;
        }
    
        // @TODO: optimize performance
        return { 
          ...fieldCarry, 
          [fieldName]: {
            ...originalFields[fieldName], 
            resolve: createAuthorizedResolver(
              authorizationCallback,
              originalFields[fieldName].resolve || defaultFieldResolver
            )  
          } 
        };
      }, {})
  
    return newFields;
  };

  export default forceAuthorizationOnFields;