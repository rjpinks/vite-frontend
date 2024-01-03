import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
        password
        email
        }
    }
`;

export const SIGNIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        user {
            _id
        }
        token
        }
    }
`;

export const ADD_POST = gql`
    mutation AddPost($poster: String!, $content: String!, $subFrm: String!) {
        addPost(poster: $poster, content: $content, subFrm: $subFrm) {
        poster
        content
        subFrm
        }
    }
`