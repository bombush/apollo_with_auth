import { createAuthorizedQueryResolver } from './resolvers';
import createAuthorizedGraphQLObjectType from './createAuthorizedGraphQLObjectType';

export default createAuthorizedGraphQLObjectType(createAuthorizedQueryResolver);
