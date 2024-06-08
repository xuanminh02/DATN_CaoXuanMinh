import { gql } from "@apollo/client"

const SEARCH_BOT= gql`
    query SEARCH_BOT($id_user: String, $query_search: String) {
        SEARCH_BOT(id_user: $id_user, query_search: $query_search) {
            term {
                title,
                description,
                id_term,
                author_id,
                author_displayName, 
                author_photoURL
            },
            class {
                class_name,
                description,
                id_class,
                author_id,
                author_displayName, 
                author_photoURL
            },
            is_finish
        }
    }
`

export default SEARCH_BOT    