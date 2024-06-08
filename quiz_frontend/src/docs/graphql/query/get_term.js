import { gql } from "@apollo/client"

const GET_TERM= gql`
    query get_term($id_term: String, $uid: String) {
        get_term(id_term: $id_term, uid: $uid) {
            title,
            count_question,
            description
            current_question,
            id_term,
            visible,
            editable,
            list_question {
                id_question,
                question,
                answer
            },
            author {
                photoURL,
                uid,
                displayName
            }
        }
    }
`

export default GET_TERM    