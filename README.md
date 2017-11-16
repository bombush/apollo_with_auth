Per request a demo of a working Apollo app with server permissions.

Running the app:

1. cd to repository root
2. yarn install

3. start the app 
 3.1 yarn start _this starts the client on localhost:3000_
 3.2 yarn server:start _this start the server on localhost:3334_


- The graphql server is present on localhost:3334/graphql
- Graphiql is present on localhost:3334/graphiql (you can play around with queries the best in Graphiql)

#### Context object
The permissions are based on user roled and context object. The context object is a plain javascript object
that can contain any arbitrary data (in our case it contains the object of the user currently logged in).
The context object is then automatically distributed among all resolvers.

#### Resolvers
Functions that translate a graphql query for a field into a real database query for the field.
In our case the resolvers call entity repositories which than apply correct permissions
to the requested objects/queries.

#### Permission schema:
I prepared two different permission schemata between which we should decide for the final app.
A sequelize/db query-based schema is implemented in ``authPre.js`` files. This basically augments/modifies the
sequelize query config object.\ 
A plain javascript object/sequelize result - based schema: implemented in ``authPost``. Takes in context with
logged user


#### Users
There are two mock users with different roles prepared in server/mockUsers. The ``authPre.js`` and ``authPost`` files modify
queries/filter results based on the roles of the users.

The mock users are injected in the context in server/server.js


#### Shortcomings and caveats
Mutations are not implemented. But the permissions should work similarly for mutations as they do for queries,
the main difference is that instead of permissions for READ operation, 
permissions for  UPDATE, CREATE or DELETE operations are used.


#### DB Dump
``apollo_mock.sql.gz``
A DB dump is in the repository.
Please create a table with collation utf8\_czech\_ci
This is a very poor mock database just for demo purposes.
Required MySQL. The final project will use PostgreSQL instead.
