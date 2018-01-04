const graphql = require('graphql');
const mongoose = require('mongoose');

const userType = new graphql.GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: {
      type: graphql.GraphQLID,
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
    newUser.id = newUser._id;
    return new Promise((resolve, reject) => {
      newUser.save(err => {
        if (err) reject(err);
        else resolve(newUser);
      });
    });
  },
};

const MutationDelete = {
  type: userType,
  args: {
    id: {
      id: 'id',
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
    },
  },
  resolve: (root, args) => {
    return new Promise((resolve, reject) => {
      USER.findByIdAndRemove(args.id, err => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
};

const MutationUpdate = {
  type: userType,
  args: {
    id: {
      id: 'id',
      type: new graphql.GraphQLNonNull(graphql.GraphQLID),
    },
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
    const updatedUser = {
      name: args.name,
      address: args.address,
    };
    return new Promise((resolve, reject) => {
      USER.findOneAndUpdate(args.id, updatedUser, { upsert: true }, err => {
        if (err) reject(err);
        else resolve();
      });
    });
  },
};

const MutationType = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: MutationAdd,
    delete: MutationDelete,
    update: MutationUpdate,
  },
});

module.exports = new graphql.GraphQLSchema({
  query: queryType,
  mutation: MutationType,
});
