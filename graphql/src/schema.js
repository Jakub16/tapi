const { gql } = require("apollo-server");

// Definicja typu
const typeDefs = gql`
  type Query {
    hello: String
    getAirport(id: ID!): Airport
    getAirports: [Airport]
    getAirplane(id: ID!): Airplane
    getAirplanes: [Airplane],
    getTicket(id: ID!): Ticket
    getTickets: [Ticket]
  }

  type Mutation {
    createAirport(id: ID, name: String): Airport
  }

  type Mutation {
    createAirplane(id: ID!, name: String!, iataTypeCode: String!, type: String!, maxSpeed: Int!, maxSpeedunit: String!, length: Int!, width: Int!, unit: String!): Airplane
  }

  type Mutation {
    createTicket(id: ID!, name: String!, surname: String!, flightNumber: String!, seatNumber: String!): Ticket
  }

  type User {
    id: ID!
    name: String!
  }

  type Airport {
    id: ID!,
    name: String!
  }

  type Airplane {
    id: ID!,
    name: String!,
    iataTypeCode: String!,
    type: String!,
    maxSpeed: Int!,
    maxSpeedUnit: String!,
    length: Int!,
    width: Int!,
    unit: String!
  }

  type Ticket {
    id: ID!,
    name: String!,
    surname: String!,
    flightNumber: String!
    seatNumber: String!
  }
`;

module.exports = typeDefs;
