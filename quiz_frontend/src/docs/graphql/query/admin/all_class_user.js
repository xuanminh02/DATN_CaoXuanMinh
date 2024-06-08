import { gql } from "@apollo/client";

const ALL_CLASS_USER = gql`
  query all_class_user($id_user: String) {
    all_class_user(id_user: $id_user) {
      class_own {
        id_class
        class_name
        description
        perform
        invite
        code_invite,
        count_member
      }
      class_join {
        id_class
        class_name
        description
        perform
        invite
        code_invite,
        count_member
      }
    }
  }
`;

export default ALL_CLASS_USER;
