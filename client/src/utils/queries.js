import { gql } from '@apollo/client';

export const QUERY_SHOWS = gql`
  query getShows {
    Shows {
      band
      date
      start
      end
      notes
      attending
      venue {
        name
        address
      }
      
    }
  }
`;

export const QUERY_USER = gql`
  query getUser {
    Users {
      name
      email
      image
      genre
      about
      }
  }
`;