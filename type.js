const graphql = require('graphql');

module.exports = new graphql.GraphQLObjectType({
  name: 'note',
  fields: () => ({
    id: {
      type: graphql.GraphQLID,
    },
    title: {
      type: graphql.GraphQLString,
    },
    content: {
      type: graphql.GraphQLString,
    },
    date_updated: {
      type: graphql.GraphQLString,
    },
    category: {
      type: graphql.GraphQLString,
    },
  }),
});
