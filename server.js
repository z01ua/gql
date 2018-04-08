'use strict';

const express   = require('express'),
  app           = express(),
  graphqlHTTP   = require('express-graphql'),
  { schema }    = require('./schema'),
  { rootValue } = require('./root-value'),
  { config }    = require('./serv-config'),
  { front }     = require('./front');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post(config.url, graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.get('/', function(req, resp) {
  resp.send(front);
});

app.listen(config.port);
console.log([
  'Running a GraphQL API server at localhost',
  config.url,
  ':' + config.port
].join(''));
