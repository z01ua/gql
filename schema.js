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

  type RoomRate {
    hotelMappingId: String!,
    channelManagerRoomRateId: String,
    channelManagerPmsRoomRateId: String,
    leonardoRoomTypeCode: String,
    leonardoRatePlanCode: String,
    channelManagerRoomRateDescription: String,
  }

  type Hotel {
    id: ID!
    code: String
    ratePlans: [ratePlan]
    roomTypes: [roomType]
    name: String
    emails: String
    languagePreference: String
    channelManagerHotelId: String!,
    channelManagerPmsHotelId: String!,
    leonardoHotelCode: String!,
    hotelEmail: String!,
    taxPercentage: Float,
    roomRates: [RoomRate]
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

  type Pms {    
    code: String!
    username: String
    hotelLevelAuthentication: Boolean
    hotels(filter: HotelsFilterInput!, page: Int, size: Int): HotelList
    hotel(code: String!): Hotel
  }

  input PmsesFilterInput {
    code: String
  }

  type PmsList {
    pagination: Pagination
    items: [Pms!]
  }

  type Query {
    getDie(numSides: Int): RandomDie
    hotel(id: ID, code: String): Hotel!
    hotels(filter: HotelsFilterInput, page: Int, size: Int): HotelList!
    pms(pmsCode: String!): Pms
    pmses(filter: PmsesFilterInput, page: Int, size: Int): PmsList!  
  }
`);

exports.schema = schema;
