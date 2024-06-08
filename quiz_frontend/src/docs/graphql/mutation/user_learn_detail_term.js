import { gql } from "@apollo/client";

const USER_LEARN_DETAIL_TERM = gql`
  mutation user_learn_detail_term(
    $id_user: String!
    $id_term: String
    $id_question: String
  ) {
    user_learn_detail_term(
      id_user: $id_user
      id_term: $id_term
      id_question: $id_question
    ) {
      is_learn,
    }
  }
`;

export default USER_LEARN_DETAIL_TERM;
