import { gql } from "@apollo/client"

const SUGGEST_TERM= gql`
    query SUGGEST_TERM {
        SUGGEST_TERM {
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

export default SUGGEST_TERM    