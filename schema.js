const graphql = require('graphql');
const mongoose = require('mongoose');
const MutationType = require('./mutations/mutations');
const QueryType = require('./queries/queries');
const NOTE = require('./model/note');

module.exports = new graphql.GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
