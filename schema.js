const graphql = require('graphql');
const mongoose = require('mongoose');

const userType = new graphql.GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: {
      type: graphql.GraphQLString,
    },
    name: {
      type: graphql.GraphQLString,
    },
    address: {
      type: graphql.GraphQLString,
    },
  }),
});

const USER = mongoose.model('users', {
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  address: String,
});

const queryType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: () => ({
    users: {
      type: new graphql.GraphQLList(userType),
      resolve: () =>
        new Promise((resolve, reject) => {
          USER.find((err, users) => {
            if (err) reject(err);
            else resolve(users);
          });
        }),
    },
  }),
});

const MutationAdd = {
  type: userType,
  description: 'add User',
  args: {
    name: {
      name: 'name',
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
    address: {
      address: 'address',
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
  },
  resolve: (root, args) => {
    const newUser = new USER({
      name: args.name,
      address: args.address,
    });
    return new Promise((resolve, reject) => {
      newUser.save(err => {
        if (err) reject(err);
        else resolve(newUser);
      });
    });
  },
};

const MutationType = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: MutationAdd,
  },
});

module.exports = new graphql.GraphQLSchema({
  query: queryType,
  mutation: MutationType,
});
