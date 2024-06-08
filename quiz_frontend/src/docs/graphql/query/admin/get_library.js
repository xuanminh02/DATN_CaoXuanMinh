import { gql } from "@apollo/client"

const GET_LIBRARY= gql`
    query get_library($id_user: String, $query_type: Int) {
        get_library(id_user: $id_user, query_type: $query_type) {
            id_term,
            title,
            description,
            visible,
            editable,
            time_created
        }
    }
`

export default GET_LIBRARY    