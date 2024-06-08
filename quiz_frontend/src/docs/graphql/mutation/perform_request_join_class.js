import { gql } from "@apollo/client" 

const PERFORM_REQUEST_JOIN_CLASS= gql`
    mutation perform_request_join_class($id_class: String!, $id_request_join: String!, $type: Int!, $id_user: String, $own_id: String) {
        perform_request_join_class(id_class: $id_class, id_request_join: $id_request_join, type: $type, id_user: $id_user, own_id: $own_id) {
            is_accept,
            is_deny,
            is_member
        }
    }
`

export default PERFORM_REQUEST_JOIN_CLASS