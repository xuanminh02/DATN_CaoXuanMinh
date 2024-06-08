import { gql } from "@apollo/client"

const REQUEST_JOIN_CLASS_MUTATION= gql`
    mutation REQUEST_JOIN_CLASS_MUTATION($id_class: String!, $id_user: String, $own_id: String) {
        REQUEST_JOIN_CLASS_MUTATION(id_class: $id_class, id_user: $id_user, own_id: $own_id) {
            is_send
        }
    }
`

export default REQUEST_JOIN_CLASS_MUTATION    