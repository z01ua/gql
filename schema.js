'use strict';

var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type ratePlan{
    code: String!
  }

  type roomType{
    code: String!
  }

  type Hotel {
    id: ID!
    code: String
    ratePlans: [ratePlan]
    roomTypes: [roomType]
    name: String
    emails: String
    languagePreference: String
  }

  input HotelsFilterInput {
    code: String
  }

  type Pagination {
    page: Int
    pages: Int!
    size: Int!
    total: Int!
  }

  type HotelList {
    items: [Hotel!]
    pagination: Pagination
  }

  type Query {
    getDie(numSides: Int): RandomDie
    hotel(id: ID, code: String): Hotel!
    hotels(filter: HotelsFilterInput, page: Int, size: Int): HotelList!
  }
`);

exports.schema = schema;
