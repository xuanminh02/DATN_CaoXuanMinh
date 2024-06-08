import { gql } from "@apollo/client"

const QUERY_TERM= gql`
    query query_term($uid: String, $type: Int) {
        query_term(uid: $uid, type: $type) {
            id_term,
            own_id,
            title,
            description,
            uid, 
            photoURL,
            displayName
        }
    }
`

export default QUERY_TERM