import { gql } from "@apollo/client";

const GET_RESULT_TEST = gql`
  query GET_RESULT_TEST($id_user: String, $id_test: String) {
    GET_RESULT_TEST(id_user: $id_user, id_test: $id_test) {
      correct_answer,
      id_question,
      question,
      chose_answer,
    }
  }
`;

export default GET_RESULT_TEST;
