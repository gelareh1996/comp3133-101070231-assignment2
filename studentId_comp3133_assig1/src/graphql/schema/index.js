const { gql } = require("apollo-server-express");

module.exports = gql`
  # Types ----------------------------
  type Login {
    user: User
    token: String!
  }
  type User {
    id: ID!
    username: String!
    firstname: String!
    lastname: String!
    type: String!
    email: String!
    password: String!
  }
  type Listing {
    id: ID!
    listing_id: String!
    listing_title: String!
    description: String!
    street: String!
    city: String!
    postal_code: String!
    price: Int!
    email: String!
    username: String!
  }
  type Booking {
    id: ID!
    listing_id: String!
    booking_id: String!
    booking_date: String!
    booking_start: String!
    booking_end: String!
    username: String!
  }

  # Inputs ----------------------------
  input UserInput {
    username: String!
    firstname: String!
    lastname: String!
    type: String!
    email: String!
    password: String!
  }
  input ListingInput {
    listing_id: String!
    listing_title: String!
    description: String!
    street: String!
    city: String!
    postal_code: String!
    price: Int!
    email: String!
    username: String!
  }
  input BookingInput {
    listing_id: String!
    booking_id: String!
    booking_date: String!
    booking_start: String!
    booking_end: String!
    username: String!
  }

  # Queries ----------------------------
  type Query {
    users: [User]!
    listings(search: String): [Listing]!
    bookings: [Booking]!
  }

  # Mutations ----------------------------
  type Mutation {
    login(username: String!, password: String!): Login!
    createUser(user: UserInput!): User!
    updateUser(id: ID!, user: UserInput!): User!
    createListing(listing: ListingInput!): Listing!
    updateListing(id: ID!, listing: ListingInput!): Listing!
    createBooking(booking: BookingInput!): Booking!
    updateBooking(id: ID!, booking: BookingInput!): Booking!
  }
`;
