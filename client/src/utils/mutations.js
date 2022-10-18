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

export const EDIT_USER = gql`
mutation editUser($id: ID!, $email: String!, $image: String!, $genre: String!, $about: String!) {
editUser(id: $id, email: $email, image: $image, genre: $genre, about: $about) {
email
  image
  genre
  about
  }
}`



export const ADD_SHOW = gql`
  mutation addShow($band: String!, $venue: String!, $address: String!, $date: String!, $start: String!, $notes: String!) {
    addShow(band: $band, venue: $venue, address: $address, date: $date, start: $start, notes: $notes) {
      _id
      band
      venue
      address
      date
      start
      notes
  }
  }
`;

export const REMOVE_SHOW = gql`
mutation removeShow($id: ID!) {
  removeShow(showId: $id) {
    _id
}
}`


