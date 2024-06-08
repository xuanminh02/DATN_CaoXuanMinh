import { gql } from "@apollo/client"

const USER_LEARNING_TERM= gql`
    query USER_LEARNING_TERM($id_user: String!, $id_term: String) {
        USER_LEARNING_TERM(id_user: $id_user, id_term: $id_term) {
            question,
            is_star,
            answer,
            id_question
        }
    }
`

export default USER_LEARNING_TERM    