import { gql } from "@apollo/client";

const stat_user_learn_term = gql`
  query stat_user_learn_term($own_id: String) {
    stat_user_learn_term(own_id: $own_id) {
      day1
      day2
      day3
      day4
      day5
      day6
      day7
    }
  }
`;

export default stat_user_learn_term;
