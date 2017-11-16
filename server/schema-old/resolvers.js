import pubsub from '../pubsub';

const links = [
  {
    id: 1,
    url: 'http://graphql.org',
    description: 'The Best Query Language'
  },
  {
    id: 2,
    url: 'http://dev.apollodata.com',
    description: 'Awesome GraphQL Client'
  }
];

export default {
  Query: {
    allLinks: async (root, data, {mongo: {Links}}) => {
      return await Links.find({}).toArray();
    }
  },
  Mutation: {
    createLink: async (root, data, { mongo: {Links}}) => {
      const response = await Links.insert(data);
      const newLink = Object.assign({ id: response.insertedIds[0]}, data);
      
      pubsub.publish('Link', {Link: {mutation: 'CREATED', node: newLink}});
      
      return newLink;
    },
    createUser: async (root, data, { mongo: {Users}}) => {
      console.log('DATA:', data);
      const newUser = {
        name: data.name,
        email: data.authProvider.email.email,
        password: data.authProvider.email.password
      };
      const response = await Users.insert(newUser);
      return Object.assign({ id: response.insertedIds[0] }, newUser);
    },
    signinUser: async (root, data, { mongo: {Users}}) => {
      const password = data.email.password;
      const email = data.email.email;

      const user = await Users.findOne({email, password});
      if (user) {
        return { 
          token: 'thisisatoken',
          user
        }
      }
    }
  },
  Subscription: {
    Link: {
      subscribe: () => pubsub.asyncIterator('Link')
    }
  },
  Link: {
    id: root => root._id || root.id
  }
};