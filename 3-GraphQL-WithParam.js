var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
var { makeExecutableSchema } = require('graphql-tools');

var typeDefs = [`

type Car{
	  name: String
	  model: String
	  make: Int
	}
	
type Query {
  hello: String
  mycar(name:String): Car
}

schema {
  query: Query
}`];

var resolvers = {
  Query: {
    hello(root) {
      return 'world';
    },
	
	mycar(root, args) {
      return {
		  name:args.name,
		  model:"mymodel",
		  make:65
	  };
    }
  }
};

var schema = makeExecutableSchema({typeDefs, resolvers});
var app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));