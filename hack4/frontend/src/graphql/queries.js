import { gql } from '@apollo/client';

export const STATS_QUERY = gql`
  query statsCount ($locationKeywords: [String], $severity: Int)
`;

export { STATS_QUERY as default}