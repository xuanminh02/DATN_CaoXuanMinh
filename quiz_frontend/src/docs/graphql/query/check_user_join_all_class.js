import { gql } from "@apollo/client"

const CHECK_USER_JOIN_ALL_CLASS= gql`
    query check_user_join_all_class($id_user: String!) {
        check_user_join_all_class(id_user: $id_user) {
            id_class, class_name, description, own_id, displayName, photoURL
        }
    }
`

export default CHECK_USER_JOIN_ALL_CLASS    