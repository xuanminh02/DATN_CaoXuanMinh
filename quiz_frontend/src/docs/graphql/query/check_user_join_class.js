import { gql } from "@apollo/client"

const CHECK_USER_JOIN_CLASS= gql`
    query check_user_join_class($id_user: String!, $id_class: String!) {
        check_user_join_class(id_user: $id_user, id_class: $id_class) {
            check,
            isOwner,
            isMember,
            role
        }
    }
`

export default CHECK_USER_JOIN_CLASS    