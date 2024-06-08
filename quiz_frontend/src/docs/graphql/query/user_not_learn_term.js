import { gql } from "@apollo/client"

const USER_NOT_LEARN_TERM= gql`
    query USER_NOT_LEARN_TERM($id_user: String!, $id_term: String) {
        USER_NOT_LEARN_TERM(id_user: $id_user, id_term: $id_term) {
            question,
            is_star,
            answer,
            id_question
        }
    }
`

export default USER_NOT_LEARN_TERM    