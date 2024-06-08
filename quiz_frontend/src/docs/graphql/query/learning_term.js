import { gql } from "@apollo/client"

const LEARNING_TERM= gql`
    query LEARNING_TERM($id_user: String!) {
        LEARNING_TERM(id_user: $id_user) {
            title,
            current_question,
            description
            id_term,
            count_question,
            own_id,
            photoURL, 
            displayName
        }
    }
`

export default LEARNING_TERM    