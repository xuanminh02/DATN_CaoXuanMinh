import { gql } from "@apollo/client"

const QUERY_EDIT_TERM= gql`
    query QUERY_EDIT_TERM($id_term: String!) {
        QUERY_EDIT_TERM(id_term: $id_term) {
            id_question,
            id_term,
            question,
            answer
        }
    }
`

export default QUERY_EDIT_TERM    