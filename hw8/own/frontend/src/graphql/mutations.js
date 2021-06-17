import { gql } from '@apollo/client';

export const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox($from: String!, $to: String!) {
    createChatBox(from: $from, to: $to) {
      name
	    messages {
        sender {
          name
        }
        body
      }
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($key: String!, $from: String!, $body: String!) {
    createMessage(key: $key, from: $from, body: $body) {
      id
      sender {
        name
      }
      body
    }
  }
`;