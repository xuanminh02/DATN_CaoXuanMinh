import { gql } from "@apollo/client"

const REQUEST_JOIN_CLASS= gql`
    query request_join_class($id_class: String!) {
        request_join_class(id_class: $id_class) {
            time_request,
            id_user, 
            displayName,
            photoURL,
            id_request_join
        }
    }
`

export default REQUEST_JOIN_CLASS    