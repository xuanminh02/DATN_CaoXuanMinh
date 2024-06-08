import { gql } from "@apollo/client";

const streak_learn = gql`
  query streak_learn($id_user: String!) {
    streak_learn(id_user: $id_user) {
      streak {
        day
      },
      is_finish
    }
  }
`;

export default streak_learn;
