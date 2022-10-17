import { gql } from '@apollo/client';

export const QUERY_SHOWS = gql`
  query getShows {
    allshows {
    _id
      band
      venue
      address
      date
      start
      notes
      attending  
    }
  }
`;

export const QUERY_USERS = gql`
  query getUsers {
    Users {
      _id
      name
      email
      image
      genre
      about
    }
  }
`;

export const QUERY_SHOW = gql`
  query getShow($showId: ID!) {
    show(showId: $showId) {
      _id
      band
      venue
      date
      start
      notes
      attending
      }
  }`

export const QUERY_BAND_SHOWS = gql`
query getBandShows($band: String!) {
  shows(band: $band) {
    _id
    band
    venue
    date
    start
    notes
    attending
    }
}`

export const QUERY_USER = gql`
  query user($_id: String!) {
    user(_id: $_id) {
      _id
      name
      email
      image
      genre
      about
    }
  }
`;