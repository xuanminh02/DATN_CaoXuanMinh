import { gql } from "@apollo/client"

const FIND_BY_CATEGORY= gql`
    query FIND_BY_CATEGORY($category: String!) {
        FIND_BY_CATEGORY(category: $category) {
            title,
            description,
            current_question,
            id_term,
            count_question,
            photoURL,
            own_id,
            displayName
        }
    }
`

export default FIND_BY_CATEGORY    