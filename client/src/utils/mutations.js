import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!, $image: String!, $genre: String!, $about: String!) {
    addUser(name: $name, email: $email, password: $password, image: $image, genre: $genre, about: $about) {
      token
      user {
        _id
        name
        email
        password
        image
        genre
        about
      }
    }
  }
`;




export const ADD_SHOW = gql`
  mutation addShow($band: String!, $venue: String!, $start: String!, $end: String!, $notes: String!, $attending: Int!) {
    addShow(band: $band, venue: $venue, start: $start, end: $end, notes: $notes, attending: $attending) {
      _id
      venue
      band
      date
      start
      end
      notes
      attending
    }
  }
`;



