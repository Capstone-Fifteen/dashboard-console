import { gql } from '@apollo/client';

const DANCER_ANALYTIC_AGGREGATE_QUERY = gql`
  query DancerAnalyticAggregateQuery {
    dancer_analytic_aggregate {
      aggregate {
        stddev {
          move_accuracy
          position_accuracy
          average_delay
        }
        variance {
          move_accuracy
          position_accuracy
          average_delay
        }
        min {
          move_accuracy
          position_accuracy
          average_delay
        }
        max {
          move_accuracy
          position_accuracy
          average_delay
        }
        avg {
          move_accuracy
          position_accuracy
          average_delay
        }
      }
    }
  }
`;

export default DANCER_ANALYTIC_AGGREGATE_QUERY;
