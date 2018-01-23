const graphql = require('graphql');
const NOTE = require('../model/note');
const { GraphQLSchema } = require('graphql');
const noteType = require('../type');

module.exports = new graphql.GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    notes: {
      type: new graphql.GraphQLList(noteType),
      resolve: () =>
        new Promise((resolve, reject) => {
          NOTE.find((err, notes) => {
            if (err) reject(err);
            else resolve(notes);
          });
        }),
    },
  }),
});
