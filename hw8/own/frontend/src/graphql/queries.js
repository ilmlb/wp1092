import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
  query chatboxes ($name: String!) {
    chatboxes(
      name: $name
    ) {
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
