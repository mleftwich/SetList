const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String!
    email: String!
    password: String!
    shows: [Show]!
  }

  type Show {
    _id: ID
    date: String!
    start: String!
    notes: String!
    attending: Int
    band: [User]!
    venue: String!
    address: String!
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(name: String!): User
    allshows: [Show]
    shows(band: String!): Show
    show(showId: ID!): Show
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!, genre: String!, image: String!): Auth
    login(email: String!, password: String!): Auth
    addShow(date: String!, start: String!, venue: String!, address: String! notes: String!, attending: Int): Show
    removeShow(showId: ID!): Show
    editShow(showId: ID!): Show
  }
`;

module.exports = typeDefs;
