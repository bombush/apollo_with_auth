import { GraphQLObjectType } from "graphql";
import forceAuthorizationOnFields from './forceAuthorizationOnFields';

const createAuthorizedGraphQLObjectType = (createAuthorizedResolver) => (config, authorizationSchema) => {
  const newFields =
    typeof(config.fields) === 'function' 
    ? () => forceAuthorizationOnFields(createAuthorizedResolver)(config.fields, authorizationSchema)
    : forceAuthorizationOnFields(createAuthorizedResolver)(() => config.fields, authorizationSchema);

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

export default createAuthorizedGraphQLObjectType;