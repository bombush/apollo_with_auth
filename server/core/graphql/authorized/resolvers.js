const nullResolver = () => null;

/*
const nullConditionHandlerNonNullField = (fieldName, parentType) => () => { 
  
}*/

//const nullConditionHandlerNullableField = (fieldName, parentType) => {} 

const authorizeArrayReturnType = (conditionTest, unauthorizedFieldHandler) => fieldValue => {
  if(!Array.isArray(fieldValue)) return fieldValue; //ignore if does not correspond to the return type
  
 // console.log(fieldValue);

  const maskedValues =
    fieldValue.map(
      arrayItem => {
        if(conditionTest()) {
          return arrayItem
        }

        return unauthorizedFieldHandler(arrayItem);
      }
    );

//    console.log('MASKEDS:', maskedValues);

  return maskedValues;
}

const authorizeValueReturnType = (conditionTest, unauthorizedFieldHandler) => fieldValue => {
  if(conditionTest) return fieldValue;

  return unauthorizedFieldHandler(fieldValue);
}

const handleUnauthorizedNonNullField = errorMessage => () => {
  throw new Error(errorMessage);
}

const handleUnauthorizedNullableField = errorMessage => () => null;

const handleUnauthorizedMutationField = () => () => {
  throw new Error('Unauthorized operation. Denied.');
}


/**
 * Create a resolver that uses an arbitrary security checking strategy for each field
 * on the type. Based on the field type it then handles error conditions.
 * (See field fieldDeniedHandlers for the concrete strategies applied to denied fields)
 * @param {*} securityConditionPost 
 * @param {*} originalResolver 
 */
const createAuthorizedQueryResolver =
  (securityConditionPost, originalResolver) => 
    (parent, args, context, resolveInfo) => {
      /**
       * Test type
       * is array return type, e.g. [Surgeon]
       * @TODO: extract for tests
       */
      const isArrayReturnType = /^\[.*!?\]!?$/.test(resolveInfo.returnType);
      const areValuesInsideNonNull = /!(\]!?)?$/.test(resolveInfo.returnType);

      /**
       * Employ different strategies for handling array and value return types
       */
      const unauthorizedFieldHandler =
      areValuesInsideNonNull 
      ? handleUnauthorizedNonNullField
      : handleUnauthorizedNullableField;

      const unauthorizedArrayFieldHandler =
        unauthorizedFieldHandler(`Access denied on a non-null member of array field 
          "${resolveInfo.fieldName}" on object of type "${resolveInfo.parentType}".`);

      const unauthorizedValueFieldHandler =
        unauthorizedFieldHandler(`A value of field "${resolveInfo.fieldName}" on object 
          of type "${resolveInfo.parentType}" was filtered by authorization.`)


      // if no rules are specified, the field is automatically unauthorized
      if(!securityConditionPost) {
        return unauthorizedValueFieldHandler();
      }

      //console.log('RESOLVE INFO:', resolveInfo);
      //console.log('PARENT', parent);

      // original field value
      const originalFieldValue = originalResolver(parent, args, context, resolveInfo);

      console.log('RT:', resolveInfo.returnType); 

      /**
       * Create security callback
       * @param {*} singleDataObject 
       */
      const secureConditionCallback =
        (singleDataObject) => 
          securityConditionPost(singleDataObject, parent, args, context, resolveInfo);

      // main logic
      if(isArrayReturnType) {
        return authorizeArrayReturnType(
            secureConditionCallback,
            unauthorizedArrayFieldHandler
          )(originalFieldValue);

      } else {//console.log('Array return type');
        return authorizeValueReturnType(
            secureConditionCallback,
            unauthorizedValueFieldHandler
          )(originalFieldValue);
      }

    // if is GraphQL non null throw
    // if is an array of GraphQL non null, throw
    }


const createAuthorizedMutationResolver =
  (securityConditionPre, originalResolver) =>
    (parent, args, context, resolveInfo) => {
      if(!securityConditionPre) {
        return handleUnauthorizedMutationField()();
      }

      // mutation must be authorized *before* actually performing it
      if(securityConditionPre(parent, args, context, resolveInfo)) {
        const originalFieldValue = originalResolver(parent, args, context, resolveInfo);
        return originalFieldValue;
      }

      return handleUnauthorizedMutationField()();
    }


export {
  nullResolver,
  createAuthorizedQueryResolver,
  createAuthorizedMutationResolver
}