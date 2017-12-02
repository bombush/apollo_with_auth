import { createAuthorizedMutationResolver } from './resolvers';
import createAuthorizedGraphQLObjectType from './createAuthorizedGraphQLObjectType';

export default createAuthorizedGraphQLObjectType(createAuthorizedMutationResolver);
