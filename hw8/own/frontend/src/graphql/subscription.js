import { gql } from '@apollo/client';

export const CHATBOX_SUBSCRIPTION = gql`
  subscription chatBox($key: String!) {
    chatBox(key: $key) {
      mutation
      key
      sender
      body
    }
  }
`;