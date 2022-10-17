const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    image: String!
    genre: String!
    about: String!
  }

  type Show {
    _id: ID!
    band: String
    venue: String!
    address: String!
    date: String!
    start: String!
    notes: String!
    attending: String
  }


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: User
    user(_id: String!): User
    allshows: [Show]
    shows(band: String!): [Show]
    show(showId: ID!): Show
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!, genre: String!, image: String!, about: String!): Auth
    login(email: String!, password: String!): Auth
    addShow(band: String!, venue: String!, address: String!, date: String!, start: String!, notes: String!): Show
    removeShow(showId: ID!): Show
    editShow(showId: ID!): Show
  }
`;

module.exports = typeDefs;
